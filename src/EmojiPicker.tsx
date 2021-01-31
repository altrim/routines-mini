import {
  Box,
  Button,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';
import Picker, { IEmojiData } from 'emoji-picker-react';
import React, { useState } from 'react';

const Smiley: React.FC = () => {
  return (
    <svg
      viewBox="0 0 14 14"
      style={{
        width: '14px',
        height: '14px',
        display: 'block',
        fill: 'rgba(55, 53, 47, 0.3)',
        flexShrink: 0,
        backfaceVisibility: 'hidden',
        marginRight: '6px',
      }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 0c3.861 0 7 3.139 7 7s-3.139 7-7 7-7-3.139-7-7 3.139-7 7-7zM3.561 5.295a1.027 1.027 0 1 0 2.054 0 1.027 1.027 0 0 0-2.054 0zm5.557 1.027a1.027 1.027 0 1 1 0-2.054 1.027 1.027 0 0 1 0 2.054zm1.211 2.816a.77.77 0 0 0-.124-1.087.786.786 0 0 0-1.098.107c-.273.407-1.16.958-2.254.958-1.093 0-1.981-.55-2.244-.945a.788.788 0 0 0-1.107-.135.786.786 0 0 0-.126 1.101c.55.734 1.81 1.542 3.477 1.542 1.668 0 2.848-.755 3.476-1.541z"
      ></path>
    </svg>
  );
};

type Props = {
  onEmojiSelected: (emoji: IEmojiData) => void;
};

export const EmojiPicker: React.FC<Props> = ({ onEmojiSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [emoji, setEmoji] = useState<IEmojiData>();

  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  const handleEmojiSelection = (event: React.MouseEvent, emoji: IEmojiData) => {
    setEmoji(emoji);
    onEmojiSelected(emoji);
    close();
  };

  return (
    <>
      <Popover placement="right-end" isOpen={isOpen}>
        <PopoverTrigger>
          <Button variant="ghost" size="sm" textColor="gray.400" height="40px" onClick={open}>
            {emoji ? (
              <Box fontSize="40px">{emoji?.emoji}</Box>
            ) : (
              <Flex p={4} direction="column" alignItems="center" justifyContent="center">
                <Smiley />
                <span>Add Icon</span>
              </Flex>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent width="280px" padding="0" border="none">
          <PopoverBody>
            {isOpen ? (
              <Picker
                onEmojiClick={handleEmojiSelection}
                pickerStyle={{ width: '260px' }}
                groupVisibility={{
                  symbols: false,
                  flags: false,
                  recently_used: false,
                }}
              />
            ) : null}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};
