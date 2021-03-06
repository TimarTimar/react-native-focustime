import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { spacing } from "../utils/sizes";
import { colors } from "../utils/colors";

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 1, isPaused, onProgress, onEnd }) => {
	const interval = React.useRef(null);
	const countDown = () => {
		setMillis((time) => {
			if (time === 0) {
				clearInterval(interval.current);
				return time;
			}
			const timeLeft = time - 1000;
			//report progress

			return timeLeft;
		});
	};
	const [millis, setMillis] = useState(minutesToMillis(minutes));

	useEffect(() => {
		onProgress(millis / minutesToMillis(minutes));
		if (millis === 0) {
			onEnd();
		}
	}, [millis, minutes, onProgress, onEnd]);

	useEffect(() => {
		if (isPaused) {
			if (interval.current) {
				clearInterval(interval.current);
				return;
			}
			return;
		}
		interval.current = setInterval(countDown, 1000);
		return () => clearInterval(interval.current);
	}, [isPaused]);

	useEffect(() => {
		setMillis(minutesToMillis(minutes));
	}, [minutes]);

	const minute = Math.floor(millis / 1000 / 60) % 60;
	const seconds = Math.floor(millis / 1000) % 60;

	return (
		<Text style={styles.text}>
			{formatTime(minute)}:{formatTime(seconds)}
		</Text>
	);
};

const styles = StyleSheet.create({
	text: {
		fontSize: spacing.xxxl,
		color: colors.white,
		padding: spacing.lg,
		backgroundColor: colors.darkBlue,
	},
});
