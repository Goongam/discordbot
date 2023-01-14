import config from '../config.json' assert {type: 'json'};
import { SlashCommandBuilder, Routes, PermissionFlagsBits } from 'discord.js';
import { REST }  from '@discordjs/rest';
// const { clientId, guildId, token } = require('./config.json');

const clientId = config.clientId;
const guildId = config.guildId;
const token = config.token;


export const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('뚱수임').setDescription('뚱수임?'),
	// new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
	new SlashCommandBuilder().setName('ping2').setDescription('Replies with Pong2!')
	.addStringOption(option => option.setName('input').setDescription('Enter a string'))
	.addIntegerOption(option => option.setName('int').setDescription('Enter an integer'))
	.addBooleanOption(option => option.setName('choice').setDescription('Select a boolean'))
	.addUserOption(option => option.setName('target').setDescription('Select a user'))
	.addChannelOption(option => option.setName('destination').setDescription('Select a channel'))
	.addRoleOption(option => option.setName('muted').setDescription('Select a role'))
	.addNumberOption(option => option.setName('num').setDescription('Enter a number'))
	.addMentionableOption(option => option.setName('mentionable').setDescription('Mention something'))
	.addAttachmentOption(option => option.setName('attachment').setDescription('Attach something')),
	new SlashCommandBuilder().setName('ban2').setDescription('ban member')
	.addUserOption(option => option.setName('target').setDescription('banMember')).setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	
	new SlashCommandBuilder().setName('노래재생').setDescription('노래재생')
	.addStringOption(option => option.setName('input').setDescription('유튜브 url 입력')).setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	// new SlashCommandBuilder().setName('노래재생').setDescription('노래를 재생')
	// .addStringOption(option => option.setName('input').setDescription('Enter a string'))
	new SlashCommandBuilder().setName('스킵').setDescription('노래스킵')
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

/**
 * @description Routes.applicationCommands(clientId) 모든 서버에서 커맨드 적용
 * */
export function registerCommnad(){
    rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
}

export function registerCommnadForAll(){
    rest.put(Routes.applicationCommands(clientId), { body: commands })
	.then(() => console.log('Successfully registered All application commands.'))
	.catch(console.error);
}
// registerCommnadForAll();