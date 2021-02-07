import React, { useState } from 'react';
import { CirclePicker, ColorResult } from 'react-color';
import { FormProvider, useForm } from 'react-hook-form';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';
import { IEmojiData } from 'emoji-picker-react';
import { Routine, routinesService } from './database/RoutinesService';
import { EmojiPicker } from './EmojiPicker';
import { JobScheduler } from './JobScheduler';
import { NotificationScheduler } from './NotificationScheduler';

const getHourAndMinute = (time: string | Date): [string, string] => {
  if (typeof time === 'string') {
    const [hour, minute] = time.split(':');
    return [hour, minute];
  }

  return [time.getHours().toString(), time.getMinutes().toString()];
};

const getScheduleDays = (days: string | string[]): string => {
  return typeof days === 'string' ? days : days.join(',');
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
export enum ScheduleFrequency {
  Daily = 'Daily',
  Weekly = 'Weekly',
}
type FormValues = {
  title: string;
  scheduleDays: string | string[];
  timeOfDay: 'custom' | string;
  customTime: Date;
  scheduleFrequency: ScheduleFrequency;
};
const defaultFormValues = {
  title: '',
  scheduleFrequency: ScheduleFrequency.Daily,
  scheduleDays: ['1', '2', '3', '4', '5'],
  timeOfDay: '9:00',
  customTime: new Date(),
};
export const RoutineCreator: React.FC<Props> = ({ isOpen, onClose }) => {
  const toast = useToast();
  const methods = useForm<FormValues>({
    defaultValues: defaultFormValues,
  });
  const { register, handleSubmit, errors, reset } = methods;
  const [emoji, setEmoji] = useState<IEmojiData>();
  const [color, setColor] = useState('#22506d');

  const handleColorChange = (color: ColorResult) => {
    setColor(color.hex);
  };

  const onSubmit = async (form: FormValues) => {
    const { title, timeOfDay, customTime } = form;

    const time = timeOfDay === 'custom' ? customTime : timeOfDay;
    const [hour, minute] = getHourAndMinute(time);

    const scheduleDays = getScheduleDays(form.scheduleDays);
    const scheduleAt = `${minute} ${hour} * * ${scheduleDays}`;

    const routine: Routine = {
      title,
      color,
      scheduleAt,
      emoji: emoji?.emoji,
    };

    // Save to Database
    await routinesService.createRoutine(routine);

    // Schedule Notification
    const job = new JobScheduler(routine);
    job.schedule();

    // Display the toast
    toast({
      position: 'bottom',
      title: 'Yay!',
      description: 'Reminder scheduled successfully ✅',
      status: 'success',
      duration: 3210,
      isClosable: true,
    });

    // Reset to default values and close the form
    reset(defaultFormValues);
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} placement="bottom" size="full" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton color="white" />
          <DrawerHeader background={color} color="white">
            New Routine
          </DrawerHeader>

          <DrawerBody>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} id="formCreator">
                <Flex direction="column">
                  <Flex direction="column" my={4}>
                    <Text mb={4} fontWeight="bold">
                      Name your routine
                    </Text>
                    <Flex>
                      <EmojiPicker onEmojiSelected={(emoji) => setEmoji(emoji)} />
                      <Input
                        focusBorderColor={color}
                        type="text"
                        name="title"
                        isInvalid={errors.title != null}
                        ref={register({ required: true })}
                        autoFocus
                        placeholder="My Awesome Routine"
                      />
                    </Flex>
                    {errors.title && (
                      <Text textColor="red.500" ml={1}>
                        Name is required
                      </Text>
                    )}
                  </Flex>

                  <Flex my={4} justifyContent="center" direction="column" width="100%">
                    <Text mb={2} fontWeight="bold">
                      Pick a color
                    </Text>
                    <CirclePicker
                      onChangeComplete={handleColorChange}
                      circleSpacing={8}
                      width="100%"
                    />
                  </Flex>
                </Flex>

                <Flex my={4} direction="column">
                  <NotificationScheduler />
                </Flex>
              </form>
            </FormProvider>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button backgroundColor={color} colorScheme="white" form="formCreator" type="submit">
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};
