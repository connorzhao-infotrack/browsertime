var config = {};
config.url=[
    'https://search.infotrack.com.au/act/Search',
    'https://search.infotrack.com.au/Queensland/Search',
    'https://search.infotrack.com.au/WA/Search',
    'https://search.infotrack.com.au/Tasmania/search',
    'https://search.infotrack.com.au/sa/Search'
];
config.elasticPostUrl=[
    'http://search-auaws-metrics-prod-shtlpsnw2kdw6tmpazoeemhskq.ap-southeast-2.es.amazonaws.com/act-user2/external?pretty',
    'http://search-auaws-metrics-prod-shtlpsnw2kdw6tmpazoeemhskq.ap-southeast-2.es.amazonaws.com/qld-user2/external?pretty',
    'http://search-auaws-metrics-prod-shtlpsnw2kdw6tmpazoeemhskq.ap-southeast-2.es.amazonaws.com/waspeed-user2/external?pretty',
	'http://search-auaws-metrics-prod-shtlpsnw2kdw6tmpazoeemhskq.ap-southeast-2.es.amazonaws.com/tasspeed-user2/external?pretty',
    'http://search-auaws-metrics-prod-shtlpsnw2kdw6tmpazoeemhskq.ap-southeast-2.es.amazonaws.com/saspeed-user2/external?pretty'
];
config.runInterval=60000;
config.prescript="/preLoginExample.js";
config.username='un';
config.password='pw';
module.exports = config;