/**
 * @format
 */

import App from './src/ui/App';
import {AppRegistry} from 'react-native';
import RepositoryFactory from './src/data/RepositoryFactory';
import StringRepositoryText from './src/data/StringRepositoryText';
import {name as appName} from './app.json';

// Set the StringRepository instance
RepositoryFactory.setStringRepository(StringRepositoryText);
AppRegistry.registerComponent(appName, () => App);
