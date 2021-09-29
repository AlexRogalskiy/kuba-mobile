import { Box, View } from 'native-base';
import React from 'react';
import { ImageBackground } from 'react-native';
import { BOARD_GREEN } from './boardColors';
import { convertBoardToBoardCoordinate } from './convertBoardToBoardCoordinate';
import { Marble } from './Marble';

export const Board = (props: any) => {
  const board = props.board;
  const boardSize = props.preview ? '128px' : '364px';
  const marbleColorSize = props.preview ? '16px' : '48px';
  const marbleEmptySize = props.preview ? '8px' : '16px';

  const [marbleClickedCoordinates, setMarbleClickedCoordinates] =
    React.useState<{ x: number; y: number } | null>(null);

  const boardCoordinate = convertBoardToBoardCoordinate(board);
  const boxMarbleSize = 100 / board.length;
  const boxMarbleSizePourcent = `${boxMarbleSize}%`;

  return (
    <ImageBackground
      source={require('./board.png')}
      resizeMode="cover"
      style={{
        position: 'relative',
        width: boardSize,
        height: boardSize,
      }}
    >
      {boardCoordinate.map((item) => (
        <Box
          alignItems="center"
          justifyContent="center"
          key={item.x + ',' + item.y}
          position="absolute"
          left={`${item.x * boxMarbleSize}%`}
          top={`${item.y * boxMarbleSize}%`}
          width={boxMarbleSizePourcent}
          height={boxMarbleSizePourcent}
          bg={
            marbleClickedCoordinates?.x === item.x &&
            marbleClickedCoordinates?.y === item.y
              ? BOARD_GREEN
              : ''
          }
        >
          {item.value != 0 && (
            <Marble
              value={item.value}
              size={marbleColorSize}
              rowIndex={item.y}
              cellIndex={item.x}
              setMarbleClickedCoordinates={setMarbleClickedCoordinates}
              setMarbleClicked={props.setMarbleClicked}
            />
          )}
        </Box>
      ))}
    </ImageBackground>
  );
};
