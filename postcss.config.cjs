module.exports = {
    plugins: [
        require('postcss-custom-properties')({
            preserve: false
        }),
        require('postcss-sorting')({
            order: [
                'custom-properties',
                'dollar-variables',
                'declarations',
                'at-rules',
                'rules'
            ],
            'properties-order': 'alphabetical',
            'unspecified-properties-position': 'bottom'
        }),
        require('autoprefixer')
    ]
}