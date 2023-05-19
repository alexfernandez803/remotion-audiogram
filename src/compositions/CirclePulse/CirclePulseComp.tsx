import {useVideoConfig} from 'remotion';
import {AudioData, visualizeAudio} from '@remotion/media-utils';
import React from 'react';
import {useCurrentFrame} from 'remotion';
import CircleVisualizationPulse from './Pulse';

const CirclePulseComp: React.FC<{
	audioData: AudioData;
	frequencyRange: Array<number>;
	numberOfSamples?: number;
	canvasWidth?: number;
	canvasHeight?: number;
	numRings?: number;
	minRadius?: number;
	maxRadius?: number;
	lineWidth?: number;
}> = ({
	canvasWidth,
	canvasHeight,
	audioData,
	frequencyRange = [82, 121],
	numberOfSamples = 256,
	minRadius = 5,
	numRings = 5,
	maxRadius = 100,
	lineWidth = 10,
}) => {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();

	const allVisualizationValues = visualizeAudio({
		fps,
		frame,
		audioData,
		numberOfSamples, // Use more samples to get a nicer visualisation
	});

	// Pick the low values because they look nicer than high values
	// feel free to play around :)
	const visualization = allVisualizationValues.slice(
		frequencyRange[0],
		frequencyRange[frequencyRange.length - 1]
	);

	return (
		<>
			<CircleVisualizationPulse
				canvasWidth={canvasWidth}
				canvasHeight={canvasHeight}
				maxRadius={maxRadius}
				minRadius={minRadius}
				numRings={numRings}
				lineWidth={lineWidth}
				frequencyData={visualization}
			/>
		</>
	);
};

export default CirclePulseComp;
