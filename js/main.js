var username = new URL(location.href).searchParams.get("username");
var user;

$(document).ready(function () {

    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    getUsuario().then(function () {
        
        $("#mi-perfil-btn").attr("href","profile.html?username=" + username);

        $("#user-name").html(user.nombre);
        
        $("#user-saldo").html("$ " + user.saldo.toFixed(2));

        //getBook(false, "ASC");

        //$("#ordenar-genero").click(ordenarPeliculas);
    });
});


async function getUsuario() {

    await $.ajax({
        type: "GET",
        dataType: "html",
        url: "./ServletUserPedir",
        data: $.param({
            username: username
        }),
        success: function (result) {
            let parsedResult = JSON.parse(result);

            if (parsedResult != false) {
                user = parsedResult;
            } else {
                console.log("Error recuperando los datos del usuario");
            }
        }
    });

}

/*
function getBook(ordenar, orden) {

    $.ajax({
        type: "GET",
        dataType: "html",
        url: "./ServletBookListar",
        data: $.param({
            ordenar: ordenar,
            orden: orden
        }),
        success: function (result) {
            let parsedResult = JSON.parse(result);

            if (parsedResult != false) {
                mostrarBooks(parsedResult);
            } else {
                console.log("Error recuperando los datos de los libros");
            }
        }
    });
}
function mostrarBooks(books) {

    let contenido = "";

    $.each(books, function (index, book) {

        book = JSON.parse(book);
        let precio;

        if (book.copias > 0) {

            if (user.premium) {

                if (book.novedad) {
                    precio = (2 - (2 * 0.1));
                } else {
                    precio = (1 - (1 * 0.1));
                }
            } else {
                if (book.novedad) {
                    precio = 2;
                } else {
                    precio = 1;
                }
            }

            contenido +=    '<tr><th scope="row">' + book.id + '</th>' +
                            '<td>' + book.titulo + '</td>' +
                            '<td>' + book.genero + '</td>' +
                            '<td>' + book.autor + '</td>' +
                            '<td>' + book.copias + '</td>' +
                            '<td><input type="checkbox" name="novedad" id="novedad' + book.id + '" disabled ';
            if (book.novedad) {
                contenido += 'checked';
            }
            contenido += '></td>' +
                    '<td>' + precio + '</td>' +
                    '<td><button onclick="alquilarPelicula(' + book.id + ',' + precio + ');" class="btn btn-success" ';
            if (user.saldo < precio) {
                contenido += ' disabled ';
            }

            contenido += '>Reservar</button></td></tr>'

        }
    });
    $("#peliculas-tbody").html(contenido);
}

 
function ordenarBooks() {

    if ($("#icono-ordenar").hasClass("fa-sort")) {
        getBooks(true, "ASC");
        $("#icono-ordenar").removeClass("fa-sort");
        $("#icono-ordenar").addClass("fa-sort-down");
    } else if ($("#icono-ordenar").hasClass("fa-sort-down")) {
        getBooks(true, "DESC");
        $("#icono-ordenar").removeClass("fa-sort-down");
        $("#icono-ordenar").addClass("fa-sort-up");
    } else if ($("#icono-ordenar").hasClass("fa-sort-up")) {
        getBooks(false, "ASC");
        $("#icono-ordenar").removeClass("fa-sort-up");
        $("#icono-ordenar").addClass("fa-sort");
    }
}
function alquilarBook(id, precio) {

    $.ajax({
        type: "GET",
        dataType: "html",
        url: "./ServletPeliculaAlquilar",
        data: $.param({
            id: id,
            username: username

        }),
        success: function (result) {
            let parsedResult = JSON.parse(result);

            if (parsedResult != false) {
                restarDinero(precio).then(function () {
                    location.reload();
                })
            } else {
                console.log("Error en la reserva de la película");
            }
        }
    });
}


async function restarDinero(precio) {

    await $.ajax({
        type: "GET",
        dataType: "html",
        url: "./ServletUsuarioRestarDinero",
        data: $.param({
            username: username,
            saldo: parseFloat(user.saldo - precio)

        }),
        success: function (result) {
            let parsedResult = JSON.parse(result);

            if (parsedResult != false) {
                console.log("Saldo actualizado");
            } else {
                console.log("Error en el proceso de pago");
            }
        }
    });
}

*/