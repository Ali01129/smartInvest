
import React from 'react';
import { View } from 'react-native';

interface SizedBoxProps {
    height: number;
}

const SizedBox: React.FC<SizedBoxProps> = ({ height }) => {
    return <View style={{ height }} />;

};

export default SizedBox;
