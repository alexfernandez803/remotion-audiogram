import {staticFile, Img} from 'remotion';

const AlbumCard = () => {
	const cardStyle = {
		display: 'flex',
		width: '400px',
		borderRadius: '10px',
		boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
		backgroundColor: '#1DB954',
		color: '#FFFFFF',
		padding: '10px',
		fontFamily: 'Arial, sans-serif',
	};

	const albumStyle = {
		width: '100px',
		height: '100px',
		marginRight: '10px',
	};

	const titleStyle = {
		fontSize: '18px',
		fontWeight: 'bold',
		margin: 0,
	};

	return (
		<div style={cardStyle}>
			<Img
				style={albumStyle}
				src={staticFile('ukulele-X2.webp')}
				alt="Album Cover"
			/>
			<div>
				<h3 style={titleStyle}>Ukulele - Royalty Free Music</h3>
				<p>by Benjamin Tissot</p>
			</div>
		</div>
	);
};

export default AlbumCard;
