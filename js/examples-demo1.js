document.addEventListener('DOMContentLoaded', () => {
    makeDemo1()
})

function makeDemo1() {
    // Read data and add circles
    d3.tsv( "data/examples-simple.tsv" )
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

    // Read and add text labels
    d3.tsv( "data/examples-simple.tsv" )
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
