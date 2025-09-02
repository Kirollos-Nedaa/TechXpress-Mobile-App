import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { router } from "expo-router";
import {
  MapPinIcon,
  MapPinSimpleIcon,
  QuestionIcon,
  XIcon,
} from "phosphor-react-native";
import CustomButton from "@/components/ui/customButton";

type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export default function Step1() {
  const [region, setRegion] = useState<Region | null>(null);
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Permission denied");
        return;
      }
      let current = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: current.coords.latitude,
        longitude: current.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setRegion(coords);

      // Fetch initial address
      const geocode = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      if (geocode[0]) {
        setAddress(formatAddress(geocode[0]));
      }
    })();
  }, []);

  const formatAddress = (geo: Location.LocationGeocodedAddress) => {
    return `${geo.name || ""} - ${geo.district || ""} - ${geo.region || ""} - ${geo.country || ""}`;
  };

  const handleRegionChange = async (r: Region) => {
    setRegion(r);
    const geocode = await Location.reverseGeocodeAsync({
      latitude: r.latitude,
      longitude: r.longitude,
    });
    if (geocode[0]) {
      setAddress(formatAddress(geocode[0]));
      setArea(
        geocode[0].district || geocode[0].city || geocode[0].region || ""
      );
    }
  };

  const handleSearchPress = () => {
    router.push(
      "/(root)/(tabs)/account/account_tabs/address/addNewAddress/search"
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Cancel */}
      <View className="flex-row justify-end relative p-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-2 right-4"
        >
          <Text className="text-xl font-PSReg text-gray-900">Cancel</Text>
        </TouchableOpacity>
      </View>

      {/* Address preview as touchable */}
      <TouchableWithoutFeedback onPress={handleSearchPress}>
        <View className="flex flex-row items-center gap-1 absolute top-32 left-4 right-4 z-10 bg-white rounded-lg px-3 py-4">
          <MapPinIcon size={24} color="#929FA5" />
          <View className="flex flex-col">
            <Text numberOfLines={1} className="font-PSBold text-gray-500 pr-7">
              {address || "Move the map to pick location or click locate me"}
            </Text>
            <Text className="font-PSReg text-gray-400">{area}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>

      {/* Map */}
      {region ? (
        <View className="flex-1">
          <MapView
            provider="google"
            style={{ flex: 1 }}
            region={region}
            onRegionChangeComplete={handleRegionChange}
          />
          <View className="absolute inset-0 items-center justify-center">
            <Image
              source={require("@/assets/images/pin.png")}
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
              className="absolute -translate-y-1/2"
            />
          </View>

          {/* Locate Me button */}
          <TouchableOpacity
            className="flex flex-row items-center gap-1 absolute bottom-10 right-4 bg-white rounded-full px-3 py-2"
            onPress={async () => {
              let current = await Location.getCurrentPositionAsync({});
              const coords = {
                latitude: current.coords.latitude,
                longitude: current.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              };
              setRegion(coords);
              const geocode = await Location.reverseGeocodeAsync({
                latitude: coords.latitude,
                longitude: coords.longitude,
              });
              if (geocode[0]) {
                setAddress(formatAddress(geocode[0]));
              }
            }}
          >
            <MapPinIcon size={20} weight="fill" color="black" />
            <Text className="text-lg font-PSBold text-gray-900">Locate Me</Text>
          </TouchableOpacity>

          {/* Question Button + Tooltip */}
          <TouchableOpacity
            className="flex flex-row items-center gap-1 absolute bottom-10 left-5 bg-white rounded-full p-2"
            onPress={() => setShowHelp(!showHelp)}
          >
            <QuestionIcon size={22} weight="bold" color="#2DA5F3" />
          </TouchableOpacity>

          {showHelp && (
            <View className="absolute bottom-24 left-4 right-4 bg-gray-900 rounded-2xl p-5 shadow-lg">
              {/* Header */}
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-white text-lg font-PSBold">
                  Set your exact location
                </Text>
                <TouchableOpacity onPress={() => setShowHelp(false)}>
                  <XIcon size={24} weight="bold" color="#ADB7BC" />
                </TouchableOpacity>
              </View>

              {/* Description */}
              <Text className="text-gray-300 text-sm mb-4">
                We need your exact location so we can deliver your order
                successfully. Please mark it accurately on the map using the
                following methods:
              </Text>

              {/* Options */}
              <View className="">
                <View className="flex flex-row justify-between items-cente border-y border-gray-700 py-2">
                  <Text className="text-white text-md py-2">
                    "Locate Me" button
                  </Text>
                  <View className="flex flex-row items-center gap-1 bg-white rounded-full px-3 py-2">
                    <MapPinIcon size={14} weight="fill" color="black" />
                    <Text className="text-xs font-PSBold text-gray-900">
                      Locate Me
                    </Text>
                  </View>
                </View>

                <View className="flex-row justify-between items-center border-b border-gray-700 py-2">
                  <Text className="text-white text-md py-2">Search bar</Text>
                  <View className="flex flex-row items-center gap-1 bg-white rounded-full px-3 py-2">
                    <MapPinIcon size={14} color="black" />
                    <Text className="text-xs font-PSBold text-gray-900">
                      Search
                    </Text>
                  </View>
                </View>

                <View className="flex-row justify-between items-center py-2">
                  <Text className="text-white text-md">Map pin</Text>
                  <View className="flex flex-row items-center gap-1 bg-white rounded-full p-1">
                    <MapPinSimpleIcon size={20} weight="fill" color="#FA8323" />
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text>Loading map...</Text>
        </View>
      )}

      {/* Confirm */}
      <View className="px-3 pt-4">
        <CustomButton
          Title="Confirm Location"
          BgVariant="primary"
          ClassName="py-3"
          TextVatiant="font-PSBold text-white uppercase"
          onPress={() =>
            router.replace({
              pathname:
                "/(root)/(tabs)/account/account_tabs/address/addNewAddress/step-2",
              params: { finalAddress: address },
            })
          }
        />
      </View>
    </SafeAreaView>
  );
}
