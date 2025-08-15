import { IExecuteFunctions } from 'n8n-core';
import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

export class GuruDigitalManager implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Guru Digital Manager',
		name: 'guruDigitalManager',
		icon: 'file:guruDigitalManager.png',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Guru Digital Manager API',
		defaults: {
			name: 'Guru Digital Manager',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'guruDigitalManagerApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Contact',
						value: 'contact',
					},
					{
						name: 'Transaction',
						value: 'transaction',
					},
					{
						name: 'Subscription',
						value: 'subscription',
					},
				],
				default: 'contact',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'contact',
						],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new contact',
						action: 'Create a contact',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a contact',
						action: 'Delete a contact',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a contact by ID',
						action: 'Get a contact',
					},
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all contacts',
						action: 'Get all contacts',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a contact',
						action: 'Update a contact',
					},
				],
				default: 'get',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'transaction',
						],
					},
				},
				options: [
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a transaction',
						action: 'Delete a transaction',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a transaction by ID',
						action: 'Get a transaction',
					},
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all transactions',
						action: 'Get all transactions',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a transaction',
						action: 'Update a transaction',
					},
				],
				default: 'get',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'subscription',
						],
					},
				},
				options: [
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a subscription',
						action: 'Delete a subscription',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a subscription by ID',
						action: 'Get a subscription',
					},
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all subscriptions',
						action: 'Get all subscriptions',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a subscription',
						action: 'Update a subscription',
					},
				],
				default: 'get',
			},
			// Contact specific fields
			{
				displayName: 'Contact ID',
				name: 'contactId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: ['get', 'update', 'delete'],
						resource: ['contact'],
					},
				},
				description: 'The ID of the contact',
			},
			{
				displayName: 'Contact Data',
				name: 'contactData',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: false,
				},
				displayOptions: {
					show: {
						operation: ['create', 'update'],
						resource: ['contact'],
					},
				},
				default: {},
				options: [
					{
						name: 'contactFields',
						displayName: 'Contact Fields',
						values: [
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
								description: 'Contact name',
							},
							{
								displayName: 'Email',
								name: 'email',
								type: 'string',
								default: '',
								description: 'Contact email',
							},
							{
								displayName: 'Phone',
								name: 'phone',
								type: 'string',
								default: '',
								description: 'Contact phone number',
							},
							{
								displayName: 'Document',
								name: 'document',
								type: 'string',
								default: '',
								description: 'Contact document (CPF/CNPJ)',
							},
						],
					},
				],
			},
			// Contact filters for GetAll - Dynamic system
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						operation: ['getAll'],
						resource: ['contact'],
					},
				},
				options: [
					{
						displayName: 'Created At End',
						name: 'created_at_end',
						type: 'dateTime',
						default: '',
						description: 'Filter by creation date end (YYYY-MM-DD)',
					},
					{
						displayName: 'Created At Start',
						name: 'created_at_ini',
						type: 'dateTime',
						default: '',
						description: 'Filter by creation date start (YYYY-MM-DD)',
					},
					{
						displayName: 'Cursor',
						name: 'cursor',
						type: 'string',
						default: '',
						description: 'Pagination cursor for next page',
					},
					{
						displayName: 'Document',
						name: 'doc',
						type: 'string',
						default: '',
						description: 'Filter by document (CPF/CNPJ)',
					},
					{
						displayName: 'Email',
						name: 'email',
						type: 'string',
						default: '',
						description: 'Filter by contact email',
					},
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Filter by contact name',
					},
				],
			},
			// Transaction specific fields
			{
				displayName: 'Transaction ID',
				name: 'transactionId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: ['get', 'update', 'delete'],
						resource: ['transaction'],
					},
				},
				description: 'The ID of the transaction',
			},
			{
				displayName: 'Transaction Data',
				name: 'transactionData',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: false,
				},
				displayOptions: {
					show: {
						operation: ['update'],
						resource: ['transaction'],
					},
				},
				default: {},
				options: [
					{
						name: 'transactionFields',
						displayName: 'Transaction Fields',
						values: [
							{
								displayName: 'Amount',
								name: 'amount',
								type: 'number',
								default: 0,
								description: 'Transaction amount',
							},
							{
								displayName: 'Description',
								name: 'description',
								type: 'string',
								default: '',
								description: 'Transaction description',
							},
							{
								displayName: 'Status',
								name: 'status',
								type: 'options',
								options: [
									{ name: 'Abandoned', value: 'abandoned' },
									{ name: 'Analysis', value: 'analysis' },
									{ name: 'Approved', value: 'approved' },
									{ name: 'Billet Printed', value: 'billet_printed' },
									{ name: 'Blocked', value: 'blocked' },
									{ name: 'Canceled', value: 'canceled' },
									{ name: 'Chargeback', value: 'chargeback' },
									{ name: 'Completed', value: 'completed' },
									{ name: 'Delayed', value: 'delayed' },
									{ name: 'Dispute', value: 'dispute' },
									{ name: 'Expired', value: 'expired' },
									{ name: 'In Recovery', value: 'in_recovery' },
									{ name: 'Refunded', value: 'refunded' },
									{ name: 'Rejected', value: 'rejected' },
									{ name: 'Scheduled', value: 'scheduled' },
									{ name: 'Started', value: 'started' },
									{ name: 'Trial', value: 'trial' },
									{ name: 'Waiting Payment', value: 'waiting_payment' },
								],
								default: 'pending',
								description: 'Transaction status',
							},
						],
					},
				],
			},
			// Transaction filters for GetAll - Dynamic system
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						operation: ['getAll'],
						resource: ['transaction'],
					},
				},
				options: [
					{
						displayName: 'Cancelled At Start',
						name: 'cancelled_at_ini',
						type: 'dateTime',
						default: '',
						description: 'Filter by cancellation date start',
					},
					{
						displayName: 'Cancelled At End',
						name: 'cancelled_at_end',
						type: 'dateTime',
						default: '',
						description: 'Filter by cancellation date end',
					},
					{
						displayName: 'Confirmed At Start',
						name: 'confirmed_at_ini',
						type: 'dateTime',
						default: '',
						description: 'Filter by confirmation date start',
					},
					{
						displayName: 'Confirmed At End',
						name: 'confirmed_at_end',
						type: 'dateTime',
						default: '',
						description: 'Filter by confirmation date end',
					},
					{
						displayName: 'Contact ID',
						name: 'contact_id',
						type: 'string',
						default: '',
						description: 'Filter by contact ID',
					},
					{
						displayName: 'Contact Document',
						name: 'contact_doc',
						type: 'string',
						default: '',
						description: 'Filter by contact document',
					},
					{
						displayName: 'Contact Email',
						name: 'contact_email',
						type: 'string',
						default: '',
						description: 'Filter by contact email',
					},
					{
						displayName: 'Contact Name',
						name: 'contact_name',
						type: 'string',
						default: '',
						description: 'Filter by contact name',
					},
					{
						displayName: 'Cursor',
						name: 'cursor',
						type: 'string',
						default: '',
						description: 'Pagination cursor for next page',
					},
					{
						displayName: 'Invoice ID',
						name: 'invoice_id',
						type: 'string',
						default: '',
						description: 'Filter by invoice ID',
					},
					{
						displayName: 'Marketplace ID',
						name: 'marketplace_id',
						type: 'string',
						default: '',
						description: 'Filter by marketplace ID',
					},
					{
						displayName: 'Marketplaces',
						name: 'marketplaces',
						type: 'string',
						default: '',
						description: 'Filter by marketplaces (comma-separated)',
					},
					{
						displayName: 'Ordered At Start',
						name: 'ordered_at_ini',
						type: 'dateTime',
						default: '',
						description: 'Filter by order date start',
					},
					{
						displayName: 'Ordered At End',
						name: 'ordered_at_end',
						type: 'dateTime',
						default: '',
						description: 'Filter by order date end',
					},
					{
						displayName: 'Payment Types',
						name: 'payment_types',
						type: 'string',
						default: '',
						description: 'Filter by payment types (comma-separated)',
					},
					{
						displayName: 'Product ID',
						name: 'product_id',
						type: 'string',
						default: '',
						description: 'Filter by product ID',
					},
					{
						displayName: 'Subscription ID',
						name: 'subscription_id',
						type: 'string',
						default: '',
						description: 'Filter by subscription ID',
					},
					{
						displayName: 'Transaction Status',
						name: 'transaction_status',
						type: 'options',
						options: [
							{ name: 'Abandoned', value: 'abandoned' },
							{ name: 'Analysis', value: 'analysis' },
							{ name: 'Approved', value: 'approved' },
							{ name: 'Billet Printed', value: 'billet_printed' },
							{ name: 'Blocked', value: 'blocked' },
							{ name: 'Canceled', value: 'canceled' },
							{ name: 'Chargeback', value: 'chargeback' },
							{ name: 'Completed', value: 'completed' },
							{ name: 'Delayed', value: 'delayed' },
							{ name: 'Dispute', value: 'dispute' },
							{ name: 'Expired', value: 'expired' },
							{ name: 'In Recovery', value: 'in_recovery' },
							{ name: 'Refunded', value: 'refunded' },
							{ name: 'Rejected', value: 'rejected' },
							{ name: 'Scheduled', value: 'scheduled' },
							{ name: 'Started', value: 'started' },
							{ name: 'Trial', value: 'trial' },
							{ name: 'Waiting Payment', value: 'waiting_payment' },
						],
						default: '',
						description: 'Filter by transaction status',
					},
				],
			},
			// Subscription specific fields
			{
				displayName: 'Subscription ID',
				name: 'subscriptionId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: ['get', 'update', 'delete'],
						resource: ['subscription'],
					},
				},
				description: 'The ID of the subscription',
			},
			{
				displayName: 'Subscription Data',
				name: 'subscriptionData',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: false,
				},
				displayOptions: {
					show: {
						operation: ['update'],
						resource: ['subscription'],
					},
				},
				default: {},
				options: [
					{
						name: 'subscriptionFields',
						displayName: 'Subscription Fields',
						values: [
							{
								displayName: 'Plan',
								name: 'plan',
								type: 'string',
								default: '',
								description: 'Subscription plan',
							},
							{
								displayName: 'Status',
								name: 'status',
								type: 'options',
								options: [
									{
										name: 'Active',
										value: 'active',
									},
									{
										name: 'Inactive',
										value: 'inactive',
									},
									{
										name: 'Cancelled',
										value: 'cancelled',
									},
								],
								default: 'active',
								description: 'Subscription status',
							},
							{
								displayName: 'Start Date',
								name: 'startDate',
								type: 'dateTime',
								default: '',
								description: 'Subscription start date',
							},
						],
					},
				],
			},
			// Common fields for getAll operations
			{
				displayName: 'Return All',
				name: 'returnAll',
				type: 'boolean',
				displayOptions: {
					show: {
						operation: ['getAll'],
					},
				},
				default: false,
				description: 'Whether to return all results or only up to a given limit',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				displayOptions: {
					show: {
						operation: ['getAll'],
						returnAll: [false],
					},
				},
				typeOptions: {
					minValue: 1,
					maxValue: 100,
				},
				default: 50,
				description: 'Max number of results to return',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		// Get credentials
		const credentials = await this.getCredentials('guruDigitalManagerApi');
		if (!credentials) {
			throw new NodeOperationError(this.getNode(), 'Credentials are required!');
		}

		const baseURL = 'https://api.guru.com.br';
		const userToken = credentials.userToken as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: any;

				if (resource === 'contact') {
					// Handle contact operations
					switch (operation) {
						case 'create':
							const contactData = this.getNodeParameter('contactData', i) as IDataObject;
							const response = await this.helpers.httpRequest({
								method: 'POST',
								url: `${baseURL}/contacts`,
								headers: {
									'Authorization': `Bearer ${userToken}`,
									'Content-Type': 'application/json',
								},
								body: contactData.contactFields,
							});
							responseData = response;
							break;

						case 'get':
							const contactId = this.getNodeParameter('contactId', i) as string;
							const getResponse = await this.helpers.httpRequest({
								method: 'GET',
								url: `${baseURL}/contacts/${contactId}`,
								headers: {
									'Authorization': `Bearer ${userToken}`,
									'Content-Type': 'application/json',
								},
							});
							responseData = getResponse;
							break;

						case 'getAll':
							const returnAll = this.getNodeParameter('returnAll', i) as boolean;
							const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
							
							const params: IDataObject = {};
							
							// Add any additional fields as query parameters
							Object.keys(additionalFields).forEach(key => {
								if (additionalFields[key] !== undefined && additionalFields[key] !== '') {
									params[key] = additionalFields[key];
								}
							});
							
							if (!returnAll) {
								const limit = this.getNodeParameter('limit', i) as number;
								params.limit = limit;
							}
							
							const getAllResponse = await this.helpers.httpRequest({
								method: 'GET',
								url: `${baseURL}/contacts`,
								headers: {
									'Authorization': `Bearer ${userToken}`,
									'Content-Type': 'application/json',
								},
								qs: params,
							});
							responseData = getAllResponse;
							break;

						case 'update':
							const updateContactId = this.getNodeParameter('contactId', i) as string;
							const updateContactData = this.getNodeParameter('contactData', i) as IDataObject;
							const updateResponse = await this.helpers.httpRequest({
								method: 'PUT',
								url: `${baseURL}/contacts/${updateContactId}`,
								headers: {
									'Authorization': `Bearer ${userToken}`,
									'Content-Type': 'application/json',
								},
								body: updateContactData.contactFields,
							});
							responseData = updateResponse;
							break;

						case 'delete':
							const deleteContactId = this.getNodeParameter('contactId', i) as string;
							await this.helpers.httpRequest({
								method: 'DELETE',
								url: `${baseURL}/contacts/${deleteContactId}`,
								headers: {
									'Authorization': `Bearer ${userToken}`,
									'Content-Type': 'application/json',
								},
							});
							responseData = { success: true, message: 'Contact deleted successfully' };
							break;

						default:
							throw new NodeOperationError(this.getNode(), `Operation ${operation} not supported for contacts`);
					}
				} else if (resource === 'transaction') {
					// Handle transaction operations
					switch (operation) {
						case 'get':
							const transactionId = this.getNodeParameter('transactionId', i) as string;
							const getResponse = await this.helpers.httpRequest({
								method: 'GET',
								url: `${baseURL}/transactions/${transactionId}`,
								headers: {
									'Authorization': `Bearer ${userToken}`,
									'Content-Type': 'application/json',
								},
							});
							responseData = getResponse;
							break;

						case 'getAll':
							const returnAll = this.getNodeParameter('returnAll', i) as boolean;
							const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
							
							const params: IDataObject = {};
							
							// Add any additional fields as query parameters
							Object.keys(additionalFields).forEach(key => {
								if (additionalFields[key] !== undefined && additionalFields[key] !== '') {
									params[key] = additionalFields[key];
								}
							});
							
							if (!returnAll) {
								const limit = this.getNodeParameter('limit', i) as number;
								params.limit = limit;
							}
							
							const getAllResponse = await this.helpers.httpRequest({
								method: 'GET',
								url: `${baseURL}/transactions`,
								headers: {
									'Authorization': `Bearer ${userToken}`,
									'Content-Type': 'application/json',
								},
								qs: params,
							});
							responseData = getAllResponse;
							break;

						case 'update':
							const updateTransactionId = this.getNodeParameter('transactionId', i) as string;
							const updateTransactionData = this.getNodeParameter('transactionData', i) as IDataObject;
							const updateResponse = await this.helpers.httpRequest({
								method: 'PUT',
								url: `${baseURL}/transactions/${updateTransactionId}`,
								headers: {
									'Authorization': `Bearer ${userToken}`,
									'Content-Type': 'application/json',
								},
								body: updateTransactionData.transactionFields,
							});
							responseData = updateResponse;
							break;

						case 'delete':
							const deleteTransactionId = this.getNodeParameter('transactionId', i) as string;
							await this.helpers.httpRequest({
								method: 'DELETE',
								url: `${baseURL}/transactions/${deleteTransactionId}`,
								headers: {
									'Authorization': `Bearer ${userToken}`,
									'Content-Type': 'application/json',
								},
							});
							responseData = { success: true, message: 'Transaction deleted successfully' };
							break;

						default:
							throw new NodeOperationError(this.getNode(), `Operation ${operation} not supported for transactions`);
					}
				} else if (resource === 'subscription') {
					// Handle subscription operations
					switch (operation) {
						case 'get':
							const subscriptionId = this.getNodeParameter('subscriptionId', i) as string;
							const getResponse = await this.helpers.httpRequest({
								method: 'GET',
								url: `${baseURL}/subscriptions/${subscriptionId}`,
								headers: {
									'Authorization': `Bearer ${userToken}`,
									'Content-Type': 'application/json',
								},
							});
							responseData = getResponse;
							break;

						case 'getAll':
							const returnAll = this.getNodeParameter('returnAll', i) as boolean;
							if (returnAll) {
								const getAllResponse = await this.helpers.httpRequest({
									method: 'GET',
									url: `${baseURL}/subscriptions`,
									headers: {
										'Authorization': `Bearer ${userToken}`,
										'Content-Type': 'application/json',
									},
								});
								responseData = getAllResponse;
							} else {
								const limit = this.getNodeParameter('limit', i) as number;
								const getAllResponse = await this.helpers.httpRequest({
									method: 'GET',
									url: `${baseURL}/subscriptions?limit=${limit}`,
									headers: {
										'Authorization': `Bearer ${userToken}`,
										'Content-Type': 'application/json',
									},
								});
								responseData = getAllResponse;
							}
							break;

						case 'update':
							const updateSubscriptionId = this.getNodeParameter('subscriptionId', i) as string;
							const updateSubscriptionData = this.getNodeParameter('subscriptionData', i) as IDataObject;
							const updateResponse = await this.helpers.httpRequest({
								method: 'PUT',
								url: `${baseURL}/subscriptions/${updateSubscriptionId}`,
								headers: {
									'Authorization': `Bearer ${userToken}`,
									'Content-Type': 'application/json',
								},
								body: updateSubscriptionData.subscriptionFields,
							});
							responseData = updateResponse;
							break;

						case 'delete':
							const deleteSubscriptionId = this.getNodeParameter('subscriptionId', i) as string;
							await this.helpers.httpRequest({
								method: 'DELETE',
								url: `${baseURL}/subscriptions/${deleteSubscriptionId}`,
								headers: {
									'Authorization': `Bearer ${userToken}`,
									'Content-Type': 'application/json',
								},
							});
							responseData = { success: true, message: 'Subscription deleted successfully' };
							break;

						default:
							throw new NodeOperationError(this.getNode(), `Operation ${operation} not supported for subscriptions`);
					}
				}

				if (Array.isArray(responseData)) {
					returnData.push(...responseData);
				} else {
					returnData.push(responseData);
				}
			} catch (error: any) {
				if (this.continueOnFail()) {
					returnData.push({ error: error.message });
					continue;
				}
				throw error;
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
