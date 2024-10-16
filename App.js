import {
	StyleSheet,
	Text,
	View,
	Button,
	TextInput,
	_ScrollView,
	ScrollView,
	FlatList,
} from "react-native";

import { StatusBar } from "expo-status-bar";

import GoalItem from "./components/GoalItem";

import { useState } from "react";
import GoalInput from "./components/GoalInput";
export default function App() {
	const [courseGoals, setcourseGoals] = useState([]);
	const [modalIsVisible, setModalIsVisible] = useState(false);

	function startAddGoalHandler() {
		setModalIsVisible(true);
	}
	function endAddGoalHandler() {
		setModalIsVisible(false);
	}

	function addGoalHandler(enteredGoalText) {
		setcourseGoals((currentCourseGoals) => [
			...currentCourseGoals,
			{ text: enteredGoalText, id: Math.random().toString() },
		]);
		setModalIsVisible(false);
	}

	function deleteGoalHandler(id) {
		console.log("Delete", id);
		setcourseGoals((currentCourseGoals) => {
			return currentCourseGoals.filter((goal) => goal.id !== id);
		});
	}

	return (
		<>
			<StatusBar style="light" />
			<View style={styles.appContainer}>
				<Button
					title="Add new Goal"
					color="#a065ec"
					onPress={startAddGoalHandler}
				/>
				<GoalInput
					visible={modalIsVisible}
					onAddGoal={addGoalHandler}
					onCancel={endAddGoalHandler}
				/>
				<View style={styles.goalsContainer}>
					<FlatList
						data={courseGoals}
						alwaysBounceVertical={true}
						renderItem={(itemData) => {
							return (
								<GoalItem
									id={itemData.item.id} // Pass the id here
									text={itemData.item.text}
									onDeleteItem={deleteGoalHandler}
								/>
							);
						}}
						keyExtractor={(item, index) => item.id}
					/>
				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	appContainer: {
		paddingTop: 50,
		paddingHorizontal: 16,
		flex: 1,
	},

	goalsContainer: {
		flex: 5,
	},
});
