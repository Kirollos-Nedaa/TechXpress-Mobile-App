import { View, Dimensions } from "react-native";
import UserProfileCard from "./ui/UserProfileCard";
import UserOrdersCard from "./ui/UserOredersCard";
import UserCreditsCard from "./ui/UserCreditsCard";
import UserReturnCard from "./ui/UserReturnCard";
import UserWishlistCard from "./ui/UserWishlistCard";

const UserProfileCards = ({
  name,
  email,
  profilePicture,
  editPress,
  ordersPress,
  returnsCount,
  returnsPress,
  credits,
  creditsPress,
  wishlistCount,
  wishlistPress,
}) => {
  const screenWidth = Dimensions.get("window").width;

  const cardWidth = screenWidth / 2 - 28;

  return (
    <View className="flex flex-wrap flex-row justify-between gap-4">
      <View style={{ width: "100%" }}>
        <UserProfileCard
          name={name}
          email={email}
          profilePicture={profilePicture}
          editPress={editPress}
        />
      </View>

      <View style={{ width: cardWidth }}>
        <UserOrdersCard ordersPress={ordersPress} />
      </View>
      <View style={{ width: cardWidth }}>
        <UserReturnCard
          returnsCount={returnsCount}
          returnsPress={returnsPress}
        />
      </View>
      <View style={{ width: cardWidth }}>
        <UserCreditsCard credits={credits} creditsPress={creditsPress} />
      </View>
      <View style={{ width: cardWidth }}>
        <UserWishlistCard
          wishlistCount={wishlistCount}
          wishlistPress={wishlistPress}
        />
      </View>
    </View>
  );
};

export default UserProfileCards;
