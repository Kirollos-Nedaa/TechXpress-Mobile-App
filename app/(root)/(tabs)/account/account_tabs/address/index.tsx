import CustomButton from "@/components/ui/customButton";
import {
  View,
  Text,
  useWindowDimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  PencilIcon,
  TrashIcon,
  MapPinSimpleAreaIcon,
} from "phosphor-react-native";
import {
  useGetAddressesQuery,
  useUpdateAddressMutation,
} from "@/services/addressApi";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "@/context/themeContext";
import { router } from "expo-router";

const Address = () => {
  const { width } = useWindowDimensions();
  const { isDark } = useContext(ThemeContext);
  const {
    data: addresses,
    isLoading,
    isError,
    refetch,
  } = useGetAddressesQuery();
  const [updateAddress] = useUpdateAddressMutation();
  const cardWidth = width - 40;
  const [selectedDefaultId, setSelectedDefaultId] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (addresses && addresses.length > 0) {
      const defaultAddress = addresses.find((addr) => addr.isDefault);
      if (defaultAddress) setSelectedDefaultId(defaultAddress.address_Id);
    }
  }, [addresses]);

  const handleConfirm = async () => {
    if (selectedDefaultId === null || !addresses) return;

    try {
      const updatePromises = addresses.map((addr) =>
        updateAddress({
          id: addr.address_Id,
          data: { ...addr, isDefault: addr.address_Id === selectedDefaultId },
        }).unwrap()
      );

      await Promise.all(updatePromises);

      // Refetch addresses to update the UI
      refetch();
    } catch (err: any) {
      console.error("Failed to update default address:", err.data || err);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-800">
      <ScrollView
        className="flex-1 px-6"
        contentContainerClassName="flex-row flex-wrap justify-center py-4"
      >
        {/* Add new address button */}
        <CustomButton
          Title="ADD A NEW ADDRESS"
          BgVariant="plank"
          ClassName="border-[1px] border-primary-500 py-2 mb-6 w-full"
          TextVatiant="font-PSMed text-primary-500"
          onPress={() =>
            router.push(
              "/(root)/(tabs)/account/account_tabs/address/addNewAddress"
            )
          }
        />

        {/* Loading & Error */}
        {isLoading && (
          <ActivityIndicator size="large" color="#11113D" className="mt-10" />
        )}
        {isError && (
          <Text className="text-red-500 font-PSMed mt-10">
            Failed to load addresses
          </Text>
        )}

        {/* Address cards */}
        {addresses &&
          addresses.map((address: any) => (
            <TouchableOpacity
              className="mx-1"
              key={address.address_Id}
              style={{ width: cardWidth }}
              onPress={() => setSelectedDefaultId(address.address_Id)}
            >
              <View
                className={`bg-white dark:bg-gray-900 rounded-xl mb-4 ${
                  selectedDefaultId === address.address_Id
                    ? "border-2 border-primary-500"
                    : ""
                }`}
              >
                {/* Header */}
                <View className="px-4 pt-2 flex-row justify-between items-center">
                  <View className="flex-row items-center gap-2">
                    <MapPinSimpleAreaIcon
                      size={24}
                      color={isDark ? "#E4E7E9" : "#191C1F"}
                    />
                    <Text className="text-lg font-PSSemiB text-gray-900 dark:text-gray-100">
                      {address.addressType}
                    </Text>
                    {address.isDefault && (
                      <Text className="text-xs text-white bg-primary-500 px-2 py-0.5 rounded-full font-PSMed">
                        Default
                      </Text>
                    )}
                  </View>

                  <View className="flex-row gap-2">
                    {/* Edit Button */}
                    <TouchableOpacity
                      className="flex-row items-center px-2 py-1 rounded-full"
                      onPress={() =>
                        router.push(
                          "/(root)/(tabs)/account/account_tabs/address/editAddress"
                        )
                      }
                    >
                      <PencilIcon
                        size={14}
                        color={isDark ? "#929FA5" : "#5F6C72"}
                        weight="fill"
                      />
                      <Text className="ml-1 text-xs font-PSLight text-gray-800 dark:text-gray-200">
                        Edit
                      </Text>
                    </TouchableOpacity>

                    {/* Delete Button */}
                    {!address.isDefault && (
                      <View className="flex flex-row">
                        <View className="flex flex-row items-center justify-center mx-1">
                          <View className="w-[1px] h-6 bg-gray-100 dark:bg-gray-800" />
                        </View>
                        <TouchableOpacity
                          className="flex-row items-center px-2 py-1 rounded-full"
                          onPress={() =>
                            console.log("Delete address", address.address_Id)
                          }
                        >
                          <TrashIcon size={14} color="#DC2626" weight="fill" />
                          <Text className="ml-1 text-xs font-PSLight text-gray-800 dark:text-gray-200">
                            Delete
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>

                {/* Divider */}
                <View className="h-[1px] bg-gray-100 dark:bg-gray-800 mx-4 my-[6px]" />

                {/* Address details */}
                <View className="px-4 pb-4 space-y-3">
                  {/* Name Section */}
                  <View className="flex-row items-center py-2">
                    <View className="w-1/3">
                      <Text className="text-sm text-gray-500 dark:text-gray-400">
                        Name
                      </Text>
                    </View>
                    <View className="flex-1 ml-4">
                      <Text className="text-sm font-PSSemiB text-gray-900 dark:text-gray-100">
                        {address.fullName || "Test"}
                      </Text>
                    </View>
                  </View>

                  {/* Address Section */}
                  <View className="flex-row items-center py-2">
                    <View className="w-1/3">
                      <Text className="text-sm text-gray-500 dark:text-gray-400">
                        Address
                      </Text>
                    </View>
                    <View className="flex-1 ml-4">
                      <Text className="text-sm font-PSMed text-gray-900 dark:text-gray-100 leading-5">
                        {address.buillding}, {address.streetAddress}
                        {address.floor && `, Floor (${address.floor})`}
                        {address.flat && `, Flat (${address.flat})`},{" "}
                        {address.city}, {address.country}, {address.postCode}
                      </Text>
                    </View>
                  </View>

                  {/* Mobile Number Section */}
                  <View className="flex-row items-center py-2">
                    <View className="w-1/3">
                      <Text className="text-sm text-gray-500 dark:text-gray-400">
                        Mobile Number
                      </Text>
                    </View>
                    <View className="flex-1 ml-4 flex-row items-center">
                      <Text className="text-sm font-PSSemiB text-gray-900 dark:text-gray-100">
                        +20-10-94959678
                      </Text>
                      <Text className="ml-2 text-sm text-success-500 font-PSMed">
                        Verified
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>

      {/* Confirm Button at bottom */}
      <View className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
        <CustomButton
          Title="Confirm"
          BgVariant="primary"
          ClassName="py-3"
          TextVatiant="font-PSMed text-white"
          onPress={handleConfirm}
        />
      </View>
    </SafeAreaView>
  );
};

export default Address;
