let AWS = require('aws-sdk');
let _auth = require('./Authorizer');
let google = require('googleapis').google;
const datastore = google.datastore('v1');
exports.handler = function (event, context, callback) {
	datastore.projects.runQuery({
		projectId: process.env.GCLOUD_PROJECT_ID,
		resource: {
			gqlQuery: {
				queryString: "SELECT*FROM Testing1",
				allowLiterals: true,
				namedBindings: {

				},
				positionalBindings: [

				]
			}
		}
	}).then(response => {
		console.log(response.data);           // successful response
        /*
        response.data = {
            "batch": {
                "entityResultType": "FULL",
                "endCursor": "<base64-encoded>",
                "entityResults": [
                    {
                        "entity": {
                            "key": {
                                "partitionId": {
                                    "projectId": "<project>"
                                },
                                "path": [{
                                        "kind": "<kind>",
                                        "name": "<name>"
                                    }
                                ]
                            },
                            "properties": {
                                "<key-1>": {
                                    "<type-1>": "<value-1>"
                                },
                                ...
                            }
                        },
                        "cursor": "<cursor>",
                        "version": "<version-timestamp>"
                    },
                    ...
                ]
            },
            "query": {
                "kind": <kind-spec>,
                "filter": {
                    "propertyFilter": <property-spec; property, op and value>
                }
            }
        }
        */
	})
		.catch(err => {
			console.log(err, err.stack); // an error occurred
		});


	callback(null, 'Successfully executed');
}