import {Composition, staticFile} from 'remotion';
import {
	CirclePulseComposition,
	CircleVisualSchema,
} from './compositions/CirclePulse';

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				// You can take the "id" to render a video:
				// npx remotion render src/index.ts <id> out/video.mp4
				id="CirclePulse"
				component={CirclePulseComposition}
				durationInFrames={135.6 * 30}
				schema={CircleVisualSchema}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					mediaUrl: staticFile('ukulele.mp3'),
					canvasHeight: 500,
					canvasWidth: 500,
					numRings: 5,
					minRadius: 25,
					lineWidth: 29,
					maxRadius: 100,
					frequencyRange: [20, 121],
				}}
			/>
		</>
	);
};
