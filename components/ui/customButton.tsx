import { ButtonProps, Image, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";

const CustomButton = ({
  onPress,
  Title,
  BgVariant = "primary",
  TextVatiant = "",
  IconLeft,
  IconRight,
  ClassName = "",
  IconName,
  IconWeight = "regular",
  IconDarkMode = false,
  IconSize = 20,
  LeftStyleIcon = false,
  ...props
}: ButtonProps) => {
  const { isDark } = useContext(ThemeContext);

  const getBgVariantStyle = (variant: ButtonProps["BgVariant"]) => {
    switch (variant) {
      case "primary":
        return "bg-primary-500";
      case "secondary":
        return "bg-secondary-500";
      case "success":
        return "bg-success-500";
      case "warning":
        return "bg-warning-500";
      case "danger":
        return "bg-danger-500";
      case "default":
        return "bg-white dark:bg-gray-900";
      default:
        return "bg-transparent border border-gray-200 dark:border-gray-600";
    }
  };

  const renderIcon = (icon) => {
    if (!icon) return null;

    if (typeof icon === "function") {
      const IconComponent = icon;
      return (
        <IconComponent
          size={IconSize}
          color={IconDarkMode ? (isDark ? "#FFF" : "#000") : "#FFF"}
          name={`${IconName}`}
          className={LeftStyleIcon ? "absolute left-5" : ""}
          weight={`${IconWeight}`}
        />
      );
    }

    return (
      <Image
        source={icon}
        resizeMode="contain"
        className={"w-7 h-7" + (LeftStyleIcon ? " absolute left-5" : "")}
      />
    );
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full rounded-md flex flex-row items-center justify-center ${getBgVariantStyle(
        BgVariant
      )} ${ClassName}`}
      {...props}
    >
      {renderIcon(IconLeft)}
      <Text className={`text-lg font-PSBold ${TextVatiant}`}>{Title}</Text>
      {renderIcon(IconRight)}
    </TouchableOpacity>
  );
};

export default CustomButton;
