import './app.css';
import { MantineProvider, Stack } from '@mantine/core';
import Stats from './components/Stats';
import Stage from './components/Stage';

export function App() {
	return (
		<MantineProvider
			theme={{ colorScheme: 'dark' }}
			withGlobalStyles
			withNormalizeCSS
		>
			<Stack p='xl'>
				<Stats />
				<Stage />
			</Stack>
		</MantineProvider>
	);
}
