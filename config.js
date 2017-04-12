var config = {};
config.url=[
    'https://search.infotrack.com.au',
    'https://search.infotrack.com.au/Nsw/Search',
    'https://search.infotrack.com.au/Victoria/Search'
];
config.elasticPostUrl=[
    'http://10.200.21.71:9200/websitespeed/external?pretty',
    'http://10.200.21.71:9200/nswspeed/external?pretty',
    'http://10.200.21.71:9200/vicspeed/external?pretty'
];
config.runInterval=120000;
config.prescript="./test/prepostscripts/preLoginExample.js";
module.exports = config;