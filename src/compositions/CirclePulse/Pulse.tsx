import React, {useRef, useEffect} from 'react';
import {RGBColor} from 'react-color';
import {interpolate, useCurrentFrame} from 'remotion';

type Props = {
	frequencyData: Array<number>;
	canvasWidth?: number;
	canvasHeight?: number;
	numRings?: number;
	minRadius?: number;
	maxRadius?: number;
	lineWidth?: number;
	circleBaseColor?: RGBColor;
	circleAlternateColor?: RGBColor;
};
const CircleVisualizationPulse: React.FC<Props> = ({
	frequencyData,
	canvasWidth = 500,
	canvasHeight = 500,
	numRings = 10,
	minRadius = 0,
	maxRadius = 200,
	lineWidth = 40,
	circleBaseColor = {
		r: 138,
		g: 43,
		b: 226,
	} as RGBColor,

	circleAlternateColor = {
		r: 138,
		g: 43,
		b: 226,
	} as RGBColor,
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const frame = useCurrentFrame();

	useEffect(() => {
		if (!canvasRef.current) {
			return;
		}

		const canvas = canvasRef.current;
		const context = canvas.getContext('2d');
		if (!context) {
			return;
		}

		// Clear the canvas
		context.clearRect(0, 0, canvas.width, canvas.height);

		const radiusStep = (maxRadius - minRadius) / numRings;
		const maxFrequencyValue = Math.max(...frequencyData);

		// Draw each ring
		for (let i = 0; i < numRings; i++) {
			const radius = minRadius + i * radiusStep + radiusStep / 2;
			const amplitude = frequencyData[i] * 100;

			const alpha = interpolate(
				frequencyData[i] ? frequencyData[i] : 1,
				[0, maxFrequencyValue <= 0 ? 1 : maxFrequencyValue],
				[0.1, 1],
				{
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
				}
			);
			context.beginPath();
			context.arc(canvasWidth / 2, canvasHeight / 2, radius, 0, 3 * Math.PI);
			context.lineWidth = lineWidth;
			context.fillStyle = 'white';
			const grd = context.createLinearGradient(0, 0, 170, 0);
			grd.addColorStop(0, 'red');
			grd.addColorStop(1, 'white');

			const strokeColor =
				i % 2 === 0
					? `rgba(${circleBaseColor.r}, ${circleBaseColor.g}, ${
							circleBaseColor.b
					  }, ${alpha * amplitude - 0.01} )`
					: `rgba(${circleAlternateColor.r}, ${circleAlternateColor.g}, ${
							circleAlternateColor.b
					  }, ${alpha * amplitude - 0.01} )`;
			context.strokeStyle = strokeColor;
			context.stroke();
		}
	}, [
		frequencyData,
		canvasHeight,
		canvasWidth,
		circleBaseColor,
		circleAlternateColor,
		lineWidth,
		maxRadius,
		minRadius,
		numRings,
		frame,
	]);

	return <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />;
};

export default CircleVisualizationPulse;
