import config from '../config.json' assert {type: 'json'};
import { SlashCommandBuilder, Routes } from 'discord.js';
import { REST }  from '@discordjs/rest';
// const { clientId, guildId, token } = require('./config.json');

const clientId = config.clientId;
const guildId = config.guildId;
const token = config.token;


const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	// new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
	new SlashCommandBuilder()
	.setName('ping2')
	.setDescription('Replies with Pong2!')
	.addStringOption(option => option.setName('input').setDescription('Enter a string'))
	.addIntegerOption(option => option.setName('int').setDescription('Enter an integer'))
	.addBooleanOption(option => option.setName('choice').setDescription('Select a boolean'))
	.addUserOption(option => option.setName('target').setDescription('Select a user'))
	.addChannelOption(option => option.setName('destination').setDescription('Select a channel'))
	.addRoleOption(option => option.setName('muted').setDescription('Select a role'))
	.addNumberOption(option => option.setName('num').setDescription('Enter a number'))
	.addMentionableOption(option => option.setName('mentionable').setDescription('Mention something'))
	.addAttachmentOption(option => option.setName('attachment').setDescription('Attach something'))
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

/**
 * @description Routes.applicationCommands(clientId) 모든 서버에서 커맨드 적용
 * */
export default function registerCommnad(){
    rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
}

function registerCommnadForAll(){
    rest.put(Routes.applicationCommands(clientId), { body: commands })
	.then(() => console.log('Successfully registered All application commands.'))
	.catch(console.error);
}
// registerCommnadForAll();