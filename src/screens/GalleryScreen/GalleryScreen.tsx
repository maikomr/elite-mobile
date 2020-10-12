import React, { useState, useEffect, useCallback, useMemo } from "react";
import firebase from "firebase";
import "@firebase/firestore";
import "@firebase/storage";
import { StyleSheet, ScrollView, Image, View, TouchableHighlight } from "react-native";
import { Layout, Spinner } from "@ui-kitten/components";
import ImageView from "react-native-image-viewing";

type IGallery = { id: string; imageUrl: string; thumbnailUrl: string }[];

const GalleryScreen = () => {
  const [gallery, setGallery] = useState<IGallery>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isScheduleImageOpen, setIsScheduleImageOpen] = useState(false);

  useEffect(() => {
    const fetchGallery = async () => {
      const snapshot = await firebase.firestore().collection("gallery-metadata").get();
      const storageRef = firebase.storage().ref();
      const newGallery = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const id = doc.id;
          const galleryItem = doc.data();
          const imageUrl = await storageRef.child(galleryItem.imageRef).getDownloadURL();
          const thumbnailUrl = await storageRef.child(galleryItem.thumbnailRef).getDownloadURL();
          return { id, imageUrl, thumbnailUrl };
        })
      );
      setGallery(newGallery);
    };
    fetchGallery();
  }, []);

  const handleRequestClose = useCallback(() => {
    setIsScheduleImageOpen(false);
  }, []);

  const images = useMemo(() => (gallery ? gallery.map((image) => ({ uri: image.imageUrl })) : []), [gallery]);

  if (!gallery) {
    return (
      <Layout style={styles.loadingStateContainer}>
        <Spinner size="giant" />
      </Layout>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Layout style={styles.container} level="2">
        {gallery.map((image, i) => (
          <TouchableHighlight
            key={image.id}
            style={styles.imageContainer}
            onPress={() => {
              setSelectedIndex(i);
              setIsScheduleImageOpen(true);
            }}
            underlayColor="#FAFBFC"
          >
            <Image style={styles.image} source={{ uri: image.thumbnailUrl }} />
          </TouchableHighlight>
        ))}
      </Layout>
      <ImageView
        images={images}
        imageIndex={selectedIndex}
        visible={isScheduleImageOpen}
        onRequestClose={handleRequestClose}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignContent: "flex-start",
  },
  loadingStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: "45%",
    height: 100,
    marginVertical: 15,
    borderRadius: 15,
  },
  image: {
    width: "100%",
    height: "100%"
  }
});

export default GalleryScreen;
