import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox, Flex, Input, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react';
import { ScheduleFrequency } from './RoutineCreator';

const TimePickerInput = React.forwardRef<HTMLInputElement>((props: any, ref) => {
  return <Input {...props} placeholder="Pick a time" ref={ref} width="140px" autoComplete="off" />;
});

type Day = {
  value: string; // 0-6
  label: string; // Mo Tu We ...
};
const days: Day[] = [
  { value: '1', label: 'Mo' },
  { value: '2', label: 'Tu' },
  { value: '3', label: 'We' },
  { value: '4', label: 'Th' },
  { value: '5', label: 'Fr' },
  { value: '6', label: 'Sa' },
  { value: '0', label: 'Su' },
];

export const NotificationScheduler: React.FC = () => {
  const { register, watch, control } = useFormContext();
  const { scheduleFrequency, timeOfDay } = watch(['scheduleFrequency', 'timeOfDay']);
  const isDaily = scheduleFrequency === ScheduleFrequency.Daily;
  const isWeekly = scheduleFrequency === ScheduleFrequency.Weekly;
  const isCustomTime = timeOfDay === 'custom';

  return (
    <Flex direction="column">
      <Text mb={2} fontWeight="bold">
        How often do you want to be reminded?
      </Text>
      <Flex direction="column" mb={4}>
        <RadioGroup name="scheduleFrequency" defaultValue={ScheduleFrequency.Daily}>
          <Stack>
            <Radio
              value={ScheduleFrequency.Daily}
              ref={register}
              cursor="pointer"
              colorScheme="cyan"
            >
              Daily On
            </Radio>
            {/* If the choice is ScheduleFrequency.Daily render the Checkboxes */}
            {isDaily ? (
              <Stack spacing={3} direction="row" px={6}>
                {days.map((item) => (
                  <Checkbox
                    name="scheduleDays"
                    key={item.value}
                    value={item.value}
                    colorScheme="green"
                    ref={register}
                    defaultChecked={parseInt(item.value) > 0 && parseInt(item.value) < 6}
                  >
                    {item.label}
                  </Checkbox>
                ))}
              </Stack>
            ) : null}
            <Radio
              value={ScheduleFrequency.Weekly}
              ref={register}
              colorScheme="cyan"
              cursor="pointer"
            >
              Once a week on...
            </Radio>
            {isWeekly ? (
              <Controller
                as={
                  <RadioGroup name="scheduleDays">
                    <Stack spacing={3} direction="row" px={6}>
                      {days.map(({ value, label }) => (
                        <Radio key={value} value={value} colorScheme="green" ref={register()}>
                          {label}
                        </Radio>
                      ))}
                    </Stack>
                  </RadioGroup>
                }
                name="scheduleDays"
                control={control}
                defaultValue="1"
              />
            ) : null}
          </Stack>
        </RadioGroup>
      </Flex>
      <Text mb={2} fontWeight="bold">
        At what time of day?
      </Text>
      <Flex direction="column">
        <RadioGroup>
          <Stack direction="column">
            <Radio name="timeOfDay" value="9:00" ref={register} colorScheme="cyan" defaultChecked>
              Beginning of the day at 9:00
            </Radio>
            <Radio name="timeOfDay" value="17:00" colorScheme="cyan" ref={register}>
              End of the day at 17:00
            </Radio>
            <Radio name="timeOfDay" value="custom" colorScheme="cyan" ref={register}>
              Pick a time
            </Radio>
            {isCustomTime ? (
              <Flex px={6}>
                <Controller
                  name="customTime"
                  control={control}
                  defaultValue={new Date()}
                  render={(props) => (
                    <DatePicker
                      ref={register}
                      name={props.name}
                      selected={props.value}
                      onChange={(date: Date) => props.onChange(date)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="HH:mm"
                      timeFormat="HH:mm"
                      customInput={<TimePickerInput {...props} ref={register} />}
                    />
                  )}
                />
              </Flex>
            ) : null}
          </Stack>
        </RadioGroup>
      </Flex>
    </Flex>
  );
};
