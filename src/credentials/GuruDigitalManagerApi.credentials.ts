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
			displayName: 'User Token',
			name: 'userToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Your user token for Guru Digital Manager API (Bearer {user_token})',
		},
	];
}
