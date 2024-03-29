var pjson = require('./package.json'),
    debug = require('debug')('openframe:gif'),
    Extension = require('openframe-extension');

/**
 * Extension initialization method.
 *
 * Called when the extension (and its dependencies) have been installed.
 *
 * @param  {object} OF An interface provided to extensions giving limited access to the frame environment
 */

module.exports = new Extension({
    format: {
        // the name should be the same as the package name
        'name': pjson.name,

        // this is what might get displayed to users
        'display_name': 'Animated GIF',

        // does this type of artwork need to be downloaded to the frame?
        'download': true,

        // how do start this type of artwork? currently two token replacements, $filepath and $url
        'start_command': function(custom_opts) {
            debug('Artwork config: ', custom_opts);
            var command = 'FBpyGIF',
                default_opts = {
                },
                opts,
                key;

            if (custom_opts && typeof custom_opts === 'object') {
                opts = Object.assign(default_opts, custom_opts);
            } else {
                opts = default_opts;
            }

            for (key in opts) {
                if (typeof opts[key] === 'boolean') {
                    // if the value is boolean, include it as a flag if it's true
                    command += opts[key] ? ' ' + key : '';
                } else {
                    // for all other arguments, assume strings and pass as arguments with values
                    command += ' ' + [key, opts[key].toString()].join(' ');
                }
            }

            command += ' $filepath';
            return command;
        },

        // how do we stop this type of artwork?
        'end_command': 'sudo pkill -f FBpyGIF'
    }
});
