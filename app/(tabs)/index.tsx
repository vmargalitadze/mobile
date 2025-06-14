import { Image } from "expo-image";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function Index() {
  return (
    <ScrollView
      style={{ backgroundColor: "#F5F5F5" }}
      contentContainerStyle={styles.scrollview}
      showsVerticalScrollIndicator={false}
      horizontal={true}
    >
      <TouchableOpacity style={styles.container}>
        <Image
          style={styles.image}
          source="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg?t=1720558643"
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
        <View style={styles.header}>
          <Text style={styles.text}>Red Dead Redemption</Text>
          <Text style={styles.dots}>⋮</Text>
        </View>
        <Text style={styles.description}>Rockstar</Text>
        <View style={styles.row}>
          <Text style={styles.ratingText}>10</Text>
          <Text style={styles.star}>★</Text>
          <View style={styles.priceBtn}>
            <Text style={styles.priceText}>FREE</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.container}>
        <Image
          style={styles.image}
          source="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR1Uy6Tz41gSwvzrAq3wC9aigMgNNsxQT1H6-EkTIIGHOLFt8f44uc9zWEHsDEYzZjzTnnlvLORyLqJwYdoY0nsaGGk4UKQA3yIG2fpAg"
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
        <View style={styles.header}>
          <Text style={styles.text}>God Of War 2: Ragnarok</Text>
          <Text style={styles.dots}>⋮</Text>
        </View>
        <Text style={styles.description}>Santa Monica</Text>
        <View style={styles.row}>
          <Text style={styles.ratingText}>10</Text>
          <Text style={styles.star}>★</Text>
          <View style={styles.priceBtn}>
            <Text style={styles.priceText}>FREE</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.container}>
        <Image
          style={styles.image}
          source="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/ad9240e088f953a84aee814034c50a6a92bf4516/header.jpg?t=1749199563"
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
        <View style={styles.header}>
          <Text style={styles.text}>The Witcher 3: Wild Hunt</Text>
          <Text style={styles.dots}>⋮</Text>
        </View>

        <Text style={styles.description}>cd projekt red</Text>
        <View style={styles.row}>
          <Text style={styles.ratingText}>10</Text>
          <Text style={styles.star}>★</Text>
          <View style={styles.priceBtn}>
            <Text style={styles.priceText}>FREE</Text>
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollview: {
    paddingBottom: 120,
  },
  container: {
    width: 200,
    height: 300,
    marginTop: 70,
    justifyContent: "center",
    marginHorizontal: 10,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    elevation: 4,
    shadowRadius: 4,
    backgroundColor: "white",
    textAlign: "left",
    borderRadius: 20,
  },
  text: {
    marginTop: 20,
    fontWeight: "500",
    marginVertical: 2,
    fontSize: 20,
    textAlign: "left",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "92%",
  },
  dots: {
    fontSize: 30,
    color: "black",
    paddingRight: 18,
  },
  description: {
    textAlign: "left",
    width: "100%",
    textTransform: "uppercase",
  },
  image: {
    width: "100%",
    height: 140,
    borderRadius: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  ratingText: {
    fontSize: 20,
    color: "#222",
    fontWeight: "bold",
    marginRight: 2,
  },
  star: {
    fontSize: 20,
    color: "#FFD600",
    marginRight: 8,
  },
  priceBtn: {
    paddingHorizontal: 6,
    marginLeft: "auto",
  },
  priceText: {
    color: "#388E3C",
    fontWeight: "bold",
    fontSize: 15,
  },
});
