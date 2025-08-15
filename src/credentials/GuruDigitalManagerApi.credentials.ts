import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class GuruDigitalManagerApi implements ICredentialType {
	name = 'guruDigitalManagerApi';
	displayName = 'Guru Digital Manager API';
	documentationUrl = 'https://docs.guru.com.br';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'API Key for Guru Digital Manager authentication',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.guru.com.br',
			required: true,
			description: 'Base URL for Guru Digital Manager API',
		},
	];
}
