import {Audio, Img, useCurrentFrame, useVideoConfig} from 'remotion';
import React from 'react';
import {useAudioData, visualizeAudio} from '@remotion/media-utils';
import {AbsoluteFill} from 'remotion';
import {z} from 'zod';
import CirclePulseComp from './CirclePulseComp';
import AlbumCard from './AlbumCard';

export const CircleVisualSchema = z.object({
	mediaUrl: z.string(),
	frequencyRange: z.number().int().array().max(2),
	canvasWidth: z.number().max(500).optional(),
	canvasHeight: z.number().max(500).optional(),
	numRings: z.number().max(50).optional(),
	minRadius: z.number().max(50).optional(),
	maxRadius: z.number().max(500).optional(),
	lineWidth: z.number().max(50).optional(),
});

export const CirclePulseComposition: React.FC<
	z.infer<typeof CircleVisualSchema>
> = ({
	mediaUrl,
	canvasWidth,
	canvasHeight,
	numRings,
	minRadius,
	maxRadius,
	lineWidth,
	frequencyRange,
}) => {
	const audioData = useAudioData(mediaUrl);

	if (!audioData) {
		return <AbsoluteFill />;
	}

	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'white',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<CirclePulseComp
				frequencyRange={frequencyRange}
				audioData={audioData}
				canvasWidth={canvasWidth}
				canvasHeight={canvasHeight}
				numRings={numRings}
				minRadius={minRadius}
				maxRadius={maxRadius}
				lineWidth={lineWidth}
			/>

			<Audio src={mediaUrl} />
			<AlbumCard />
		</AbsoluteFill>
	);
};
