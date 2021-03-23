// import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";

const { width } = Dimensions.get("screen");
import SelectCurrency from "./SelectCurrency";

import { Button, Block, Text, Input, theme } from "galio-framework";
import {
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  View,
} from "react-native";
const image = {
  uri:
    "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80",
};

import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import getSymbolFromCurrency from "currency-symbol-map";

import AnimatedLoader from "react-native-animated-loader";
import { Header } from "../components";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function App({ navigation, route }) {
  const [ConvertFrom, setConvertFrom] = useState();
  const [ConvertFromData, setConvertFromData] = useState();
  const [ConvertFromImg, setConvertFromImg] = useState();
  const [ConvertTo, setConvertTo] = useState();
  const [ConvertToData, setConvertToData] = useState();
  const [ConvertToImg, setConvertToImg] = useState();
  const [ConvertToSymbol, setConvertToSymbol] = useState();
  const [ConvertedVal, setConvertedVal] = useState(0);
  const [amount, setAmount] = useState(1);
  const [Progress, setProgress] = useState(0);
  const [visibles, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  React.useEffect(() => {
    console.log(route.params, "wowowo");
    if (route.params?.post) {
      if (route.params?.dataFor === "convertFrom") {
        setConvertFrom(route.params.post);
        setConvertFromImg(route.params.img);
        setConvertFromData(route.params.data);
      } else if (route.params?.dataFor === "convertTo") {
        setConvertTo(route.params?.post);
        setConvertToImg(route.params.img);
        setConvertToSymbol(route.params.symbol);
        setConvertToData(route.params.data);
      }
    }
  }, [route.params?.post]);

  const handleSubmit = (event) => {
    event.preventDefault();
    GetRate();
  };

  const GetRate = async () => {
    const options = {
      method: "GET",
      url: "https://currency-exchange.p.rapidapi.com/exchange",
      params: { from: ConvertFrom, to: ConvertTo, q: 1 },
      headers: {
        "x-rapidapi-key": "aaaba026a5msh9d9e0d9bfa8d38ep1134d8jsn9388688a73b4",
        "x-rapidapi-host": "currency-exchange.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setConvertedVal(response.data);
        setVisible(false);
        console.log("currency", response.data);
      })
      .catch(function (error) {
        setVisible(false);
        alert("Sorry !");
        console.error(error);
      });
  };

  const placeholder = {
    label: "Select a Currency...",
    value: null,
    color: "#9EA0A4",
  };

  return (
    // <ImageBackground source={image} style={globalStyles.image}>
    <>
      <ImageBackground
        source={{
          uri:
            "https://images.unsplash.com/photo-1513346940221-6f673d962e97?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        }}
        style={styles.image}
      >
        <Block row>
          {ConvertFrom != undefined && (
            <>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  marginLeft: 25,
                  marginTop: 100,
                  marginBottom: 100,
                }}
              >
                <Image
                  style={{
                    width: 70,
                    height: 40,
                    marginRight: 0,
                  }}
                  source={{ uri: `data:image/jpeg;base64,${ConvertFromImg}` }}
                />

                <Text
                  style={{
                    color: "white",
                    marginTop: 10,
                  }}
                >{`${ConvertFromData.name} (${ConvertFrom})`}</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  marginTop: 100,
                  marginBottom: 100,
                }}
              >
                {ConvertTo != undefined && (
                  <>
                    <View style={{ flex: 1, flexDirection: "column" }}>
                      <Image
                        style={{
                          width: 70,
                          height: 40,
                          marginRight: 0,
                        }}
                        source={{
                          uri: `data:image/jpeg;base64,${ConvertToImg}`,
                        }}
                      />

                      <Text
                        style={{
                          color: "white",
                          marginTop: 10,
                        }}
                      >{`${ConvertToData.name} (${ConvertTo})`}</Text>
                    </View>
                  </>
                )}
              </View>
            </>
          )}
        </Block>
      </ImageBackground>
      <Block
        style={{
          backgroundColor: "black",
          height: "100%",
          width: "100%",
        }}
      >
        {/* {this.renderProducts()} */}
        {/* convert from  */}
        <Block row style={{ width: "100%", marginTop: 50 }}>
          <TouchableWithoutFeedback
            style={[styles.touchable, { marginLeft: 40 }]}
            onPress={() =>
              navigation.navigate("SelectCurrency", {
                dataFor: "convertFrom",
                pageFrom: "Currency",
              })
            }
          >
            <LinearGradient
              colors={["#BF953F", "#FCF6BA", "#B38728", "#FBF5B7", "#AA771C"]}
              style={styles.LinearGradient}
              start={[0, 1]}
              end={[1, 0]}
            >
              <Text style={styles.testBtn}>Convert From</Text>
            </LinearGradient>
          </TouchableWithoutFeedback>

          {/* convert to */}
          <TouchableWithoutFeedback
            style={styles.touchable}
            onPress={() =>
              navigation.navigate("SelectCurrency", {
                dataFor: "convertTo",
                pageFrom: "Currency",
              })
            }
          >
            <LinearGradient
              colors={["#BF953F", "#FCF6BA", "#B38728", "#FBF5B7", "#AA771C"]}
              style={styles.LinearGradient}
              start={[0, 1]}
              end={[1, 0]}
            >
              <Text style={styles.testBtn}>Convert To</Text>
            </LinearGradient>
          </TouchableWithoutFeedback>
        </Block>

        {/* convert to */}

        <Block row>
          <TouchableWithoutFeedback
            style={[styles.touchable, { marginLeft: 140 }]}
            onPress={() => {
              setVisible(true);
              setProgress(1);
              GetRate();
            }}
          >
            <LinearGradient
              colors={["#BF953F", "#FCF6BA", "#B38728", "#FBF5B7", "#AA771C"]}
              style={styles.LinearGradient}
              start={[0, 1]}
              end={[1, 0]}
            >
              <Text style={styles.testBtn}>Convert </Text>
            </LinearGradient>
          </TouchableWithoutFeedback>
        </Block>
        <Block>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 25 }}>
            {ConvertedVal != 0 ? ConvertedVal : 0}
          </Text>
        </Block>
        <AnimatedLoader
          source={require("./loader.json")}
          visible={visibles}
          animationStyle={styles.lottie}
          overlayColor={"rgba(0, 0, 0,0.8)"}
          speed={1}
        />
      </Block>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    // flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    // height: "55%",
    backgroundColor: "black",
  },
  LinearGradient: {
    padding: 10,
    borderRadius: 20,
  },
  touchable: {
    padding: 10,
  },
  testBtn: {
    color: "black",
    fontSize: 21,
    fontWeight: "bold",
  },
  home: {
    width: width,
    // justifyContent: "center",
  },
  lottie: {
    width: 200,
    height: 200,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.5,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: "300",
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  products: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
  },
});
