import { ColorPalette } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";

interface SwapButtonProps {
  onPress: () => void;
}
const SwapButton: React.FC<SwapButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          backgroundColor: "#101010",
          borderRadius: 25,
          height: 50,
          width: 50,
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          top: -10,
          paddingTop: -10,
          marginBottom: -20,
        }}
      >
        <Ionicons name={"swap-vertical"} color={ColorPalette.text} size={24} />
      </View>
    </TouchableOpacity>
  );
};

export default SwapButton;
