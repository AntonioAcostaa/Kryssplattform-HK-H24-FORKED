import { getPostById } from "@/utils/dummyPostData";
import { getPostFromLocalById } from "@/utils/local_storage";
import { PostData } from "@/utils/postData";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function postDetails() {
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState<PostData | null>(null);

  const fetchPostData = async () => {
    const post = await getPostFromLocalById(id as string);
    if (post) {
      setPost(post);
    }
  };

  fetchPostData();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack.Screen
        options={{
          headerTitle: (props) => <Text>PostDetaljer</Text>,
        }}
      />
      <Text>{post?.title}</Text>
      <View style={{width: "100%", maxHeight: "50%", flex: 1}}>
        {post?.postCoordinates && (
            <MapView
                style={{width: "100%", height: "100%"}}
                initialRegion={{
                latitude: post.postCoordinates.latitude,
                longitude: post.postCoordinates.longitude,
                latitudeDelta: 0.0022,
                longitudeDelta: 0.0022,
                }}
            >
                <Marker
                coordinate={{
                    latitude: post.postCoordinates.latitude,
                    longitude: post.postCoordinates.longitude,
                }}
                title={post.title}
                description={post.description}
                />
                </MapView>
        )}
      </View>
    </View>
  );
}
