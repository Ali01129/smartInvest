import { ColorPalette } from "@/constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { TextInput, TouchableOpacity, View, StyleSheet } from "react-native";

interface ConversionInputFieldProps {
  icon: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  value: string;
  onFocus: () => void;
  focused: boolean;
}

const ConversionInputField: React.FC<ConversionInputFieldProps> = ({
  icon,
  placeholder,
  onChangeText,
  value,
  onFocus,
  focused,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.inputField,
        focused ? { borderWidth: 1, borderColor: ColorPalette.primary } : null,
      ]}
      onPress={onFocus}
    >
      <View style={{ width: 60 }}>
        <FontAwesome5
          name={icon}
          size={24}
          style={styles.icon}
          color={ColorPalette.primary}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={ColorPalette.textGrey}
        onChangeText={(text) => {
          onChangeText(text);
        }}
        value={value}
        editable={false} // Make TextInput non-editable to prevent the native keyboard from opening
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 50,
    color: ColorPalette.text,
  },
  icon: {
    marginHorizontal: 16,
    fontWeight: "bold",
  },
  inputField: {
    backgroundColor: ColorPalette.greyNav,
    height: 60,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    elevation: -1,
  },
});

export default ConversionInputField;
