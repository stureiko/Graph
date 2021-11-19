document.addEventListener('DOMContentLoaded', () => {
    makeDemo1()
})

function plot_nodes(tsv) {
    d3.tsv( tsv )
        .then( function( data ) {
            d3.select( "svg" )
                .selectAll( "circle" )
                .data( data )
                .enter()
                .append( "circle" )
                .attr( "r", 5 ).attr( "fill", "red" )
                .attr( "cx", function(d) { return d["x"] } )
                .attr( "cy", function(d) { return d["y"] } );
        } );
}

function plot_captions(tsv) {
    // Read and add text labels
    d3.tsv( tsv )
        .then( function( data ) {
            d3.select( "svg" )
                .selectAll( "text" )
                .data( data )
                .enter()
                .append( "text" )
                .attr( "x", function(d) { return d["x"] } )
                .attr( "y", function(d) { return d["y"] } )
                .attr('stroke', 'green')
                .style("font-size", 18)
                .text(function(d) { return d["name"] });
        } );
}

function makeDemo1() {
    // Plot Nodes
    plot_nodes("data/examples-simple.tsv")

    // Plot captions
    plot_captions("data/examples-simple.tsv")
}
