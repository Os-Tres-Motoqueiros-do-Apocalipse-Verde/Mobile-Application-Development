import { ActivityIndicator } from "react-native";

export default function Loading ({isLoading}) {
    return isLoading?<ActivityIndicator color="green" size={40} style={{margin:20}}/> : null
}
// Só eu colocar o loading nas