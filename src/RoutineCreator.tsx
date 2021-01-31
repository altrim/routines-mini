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
} from '@chakra-ui/react';
import { IEmojiData } from 'emoji-picker-react';
import React, { useState } from 'react';
import { CirclePicker, ColorResult } from 'react-color';
import { useForm } from 'react-hook-form';
import { Routine, routinesService } from './database/RoutinesService';
import { EmojiPicker } from './EmojiPicker';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
export const RoutineCreator: React.FC<Props> = ({ isOpen, onClose }) => {
  const { register, handleSubmit, reset, errors } = useForm();
  const [selectedEmoji, setSelectedEmoji] = useState<IEmojiData>();
  const [color, setColor] = useState('#22506d');

  const handleColorChange = (color: ColorResult) => {
    setColor(color.hex);
  };

  const onSubmit = async (data: Routine) => {
    await routinesService.createRoutine({
      ...data,
      color,
      emoji: selectedEmoji?.emoji,
    });

    reset({ title: '' });
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} placement="bottom" size="full" onClose={onClose}>
      <DrawerOverlay>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DrawerContent>
            <DrawerCloseButton color="white" />
            <DrawerHeader background={color} color="white">
              New Routine
            </DrawerHeader>

            <DrawerBody>
              <Flex direction="column">
                <Flex direction="column">
                  <Text mb={2}>Name your routine</Text>
                  <Flex alignItems="center">
                    <EmojiPicker onEmojiSelected={(emoji) => setSelectedEmoji(emoji)} />
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

                <Flex my={4} alignItems="center" justifyContent="center" direction="column">
                  <Text mb={2}>Pick a color</Text>
                  <CirclePicker onChangeComplete={handleColorChange} />
                </Flex>
              </Flex>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button backgroundColor={color} colorScheme="white" type="submit">
                Save
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </DrawerOverlay>
    </Drawer>
  );
};
