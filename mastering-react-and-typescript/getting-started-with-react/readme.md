


### Issues encountered

WebPack 2 no longer allows custom properties and `postcss` configuration property was considered unknown.
```json
module.exports = {

    // ...

    // configuration for the postcss loader which modifies CSS after processing
    // autoprefixer plugin for postcss adds vendor specific prefixing for
    // non-standard or experimental css properties
    postcss: [ require('autoprefixer') ],

    // ...
    
}
```