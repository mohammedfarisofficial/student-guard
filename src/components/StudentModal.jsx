import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet ,Button} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const StudentModal = ({isVisible,reference,onPress}) => {
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);
  return (
      <BottomSheet
        ref={reference}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
          <Button title='close' onPress={onPress}/>
        </View>
      </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default StudentModal;