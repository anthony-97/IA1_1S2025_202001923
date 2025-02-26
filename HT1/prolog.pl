%Hechos
padre(berto, anthony).
padre(berto, gabriela).
madre(juana, anthony).
madre(juana, gabriela).

padre(francisco, berto).
madre(bernarda, berto).

%Regla1
hermano(X, Y) :- padre(P, X), padre(P, Y), madre(M, X), madre(M, Y), X \= Y.

%Regla2 -> Hijos
hijo(X, Y) :- padre(Y, X).
hijo(X, Y) :- madre(Y, X).

%Regla3 
abuelo(X, Y) :- padre(X, Z), padre(Z, Y).
abuelo(X, Y) :- padre(X, Z), madre(Z, Y).