import { IExecuteFunctions } from 'n8n-core';
import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';
import axios from 'axios';

export class GuruDigitalManager implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Guru Digital Manager',
		name: 'guruDigitalManager',
		icon: 'file:guruDigitalManager.svg',
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
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
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
						name: 'Create',
						value: 'create',
						description: 'Create a new transaction',
						action: 'Create a transaction',
					},
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
						name: 'Create',
						value: 'create',
						description: 'Create a new subscription',
						action: 'Create a subscription',
					},
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
						operation: ['create', 'update'],
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
									{
										name: 'Pending',
										value: 'pending',
									},
									{
										name: 'Completed',
										value: 'completed',
									},
									{
										name: 'Failed',
										value: 'failed',
									},
								],
								default: 'pending',
								description: 'Transaction status',
							},
						],
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
						operation: ['create', 'update'],
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
		const credentials = await this.getCredentials('guruDigitalManagerApi');

		// Set up axios with authentication
		const axiosInstance = axios.create({
			baseURL: credentials.baseUrl as string,
			headers: {
				'Authorization': credentials.apiKey as string,
				'Content-Type': 'application/json',
			},
		});

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: any;

				if (resource === 'contact') {
					// Handle contact operations
					switch (operation) {
						case 'create':
							const contactData = this.getNodeParameter('contactData', i) as IDataObject;
							const response = await axiosInstance.post('/contacts', contactData.contactFields);
							responseData = response.data;
							break;

						case 'get':
							const contactId = this.getNodeParameter('contactId', i) as string;
							const getResponse = await axiosInstance.get(`/contacts/${contactId}`);
							responseData = getResponse.data;
							break;

						case 'getAll':
							const returnAll = this.getNodeParameter('returnAll', i) as boolean;
							if (returnAll) {
								const getAllResponse = await axiosInstance.get('/contacts');
								responseData = getAllResponse.data;
							} else {
								const limit = this.getNodeParameter('limit', i) as number;
								const getAllResponse = await axiosInstance.get(`/contacts?limit=${limit}`);
								responseData = getAllResponse.data;
							}
							break;

						case 'update':
							const updateContactId = this.getNodeParameter('contactId', i) as string;
							const updateContactData = this.getNodeParameter('contactData', i) as IDataObject;
							const updateResponse = await axiosInstance.put(`/contacts/${updateContactId}`, updateContactData.contactFields);
							responseData = updateResponse.data;
							break;

						case 'delete':
							const deleteContactId = this.getNodeParameter('contactId', i) as string;
							await axiosInstance.delete(`/contacts/${deleteContactId}`);
							responseData = { success: true, message: 'Contact deleted successfully' };
							break;

						default:
							throw new NodeOperationError(this.getNode(), `Operation ${operation} not supported for contacts`);
					}
				} else if (resource === 'transaction') {
					// Handle transaction operations
					switch (operation) {
						case 'create':
							const transactionData = this.getNodeParameter('transactionData', i) as IDataObject;
							const response = await axiosInstance.post('/transactions', transactionData.transactionFields);
							responseData = response.data;
							break;

						case 'get':
							const transactionId = this.getNodeParameter('transactionId', i) as string;
							const getResponse = await axiosInstance.get(`/transactions/${transactionId}`);
							responseData = getResponse.data;
							break;

						case 'getAll':
							const returnAll = this.getNodeParameter('returnAll', i) as boolean;
							if (returnAll) {
								const getAllResponse = await axiosInstance.get('/transactions');
								responseData = getAllResponse.data;
							} else {
								const limit = this.getNodeParameter('limit', i) as number;
								const getAllResponse = await axiosInstance.get(`/transactions?limit=${limit}`);
								responseData = getAllResponse.data;
							}
							break;

						case 'update':
							const updateTransactionId = this.getNodeParameter('transactionId', i) as string;
							const updateTransactionData = this.getNodeParameter('transactionData', i) as IDataObject;
							const updateResponse = await axiosInstance.put(`/transactions/${updateTransactionId}`, updateTransactionData.transactionFields);
							responseData = updateResponse.data;
							break;

						case 'delete':
							const deleteTransactionId = this.getNodeParameter('transactionId', i) as string;
							await axiosInstance.delete(`/transactions/${deleteTransactionId}`);
							responseData = { success: true, message: 'Transaction deleted successfully' };
							break;

						default:
							throw new NodeOperationError(this.getNode(), `Operation ${operation} not supported for transactions`);
					}
				} else if (resource === 'subscription') {
					// Handle subscription operations
					switch (operation) {
						case 'create':
							const subscriptionData = this.getNodeParameter('subscriptionData', i) as IDataObject;
							const response = await axiosInstance.post('/subscriptions', subscriptionData.subscriptionFields);
							responseData = response.data;
							break;

						case 'get':
							const subscriptionId = this.getNodeParameter('subscriptionId', i) as string;
							const getResponse = await axiosInstance.get(`/subscriptions/${subscriptionId}`);
							responseData = getResponse.data;
							break;

						case 'getAll':
							const returnAll = this.getNodeParameter('returnAll', i) as boolean;
							if (returnAll) {
								const getAllResponse = await axiosInstance.get('/subscriptions');
								responseData = getAllResponse.data;
							} else {
								const limit = this.getNodeParameter('limit', i) as number;
								const getAllResponse = await axiosInstance.get(`/subscriptions?limit=${limit}`);
								responseData = getAllResponse.data;
							}
							break;

						case 'update':
							const updateSubscriptionId = this.getNodeParameter('subscriptionId', i) as string;
							const updateSubscriptionData = this.getNodeParameter('subscriptionData', i) as IDataObject;
							const updateResponse = await axiosInstance.put(`/subscriptions/${updateSubscriptionId}`, updateSubscriptionData.subscriptionFields);
							responseData = updateResponse.data;
							break;

						case 'delete':
							const deleteSubscriptionId = this.getNodeParameter('subscriptionId', i) as string;
							await axiosInstance.delete(`/subscriptions/${deleteSubscriptionId}`);
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
