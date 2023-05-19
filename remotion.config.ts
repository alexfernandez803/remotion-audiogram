// See all configuration options: https://remotion.dev/docs/config
// Each option also is available as a CLI flag: https://remotion.dev/docs/cli

// Note: The configuration file does only apply if you render via the CLI !

import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('png');
Config.setCodec('prores');
Config.setPixelFormat('yuva444p10le');
Config.setProResProfile('4444');
Config.setOverwriteOutput(true);
