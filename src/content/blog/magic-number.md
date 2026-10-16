---
title: "Code Smell - Números mágicos"
description: "Sobre valores numéricos sin explicación aparente."
pubDate: 2026-10-16
---

La numerología, como pseudociencia, es bastante discutible. Y aunque seguro que hay informáticos que se han leído el _Numerorum mysteria_, lo más probable es que incluso a ellos les cueste entender el significado de un número cualquiera en un fragmento de código.

Por ejemplo, si analizamos el siguiente código, veremos unos pocos números (y otros literales) mágicos. 

```cpp
float precioFinal(float precio, char* region) {
    if (strcmp(region, "ES") == 0) {
        return precio_inicial + precio_inicial * 0.21;
    }

    if (strcmp(region, "PT") == 0) {
        return precio_inicial + precio_inicial * 0.23;
    }

    if (strcmp(region, "IC") == 0) {
        return precio_inicial + precio_inicial * 0.07;       
    }
}
```

En realidad un número mágico, no tiene por qué ser un número. Puede ser cualquier valor literal que nos encontremos en el código cuyo significado pueda ser objeto de confusión. En este caso, incluirían `0.21`, `0.23` y `0.07` por un lado, y `"ES`, `"PT"` y `"IC"` por otro.

El código comprueba en qué región se está vendiendo un producto y calcula el impuesto que tiene que aplicarle. 21% de IVA para España, 23% en Portugal, y un mero 7% de IGIC (Impuesto General Indirecto Canario) a las Islas Canarias. Sabiendo esto, vamos a mejorar el código.

## Solución
Sustituir el literal mágico por una constante que explique su significado.

```cpp
constexpr float IVA_ES = 0.21f;
constexpr float IVA_PT = 0.23f;
constexpr float IGIC_IC = 0.07f;

constexpr const char* ZONA_IMPOSITIVA_ESPAÑA = "ES";
constexpr const char* ZONA_IMPOSITIVA_PORTUGAL = "PT";
constexpr const char* ZONA_IMPOSITIVA_CANARIAS = "IC";

float precioFinal(float precio, char* region) {
    if (strcmp(region, ZONA_IMPOSITIVA_ESPAÑA) == 0) {
        return precio_inicial + precio_inicial * IVA_ES;
    }

    if (strcmp(region, ZONA_IMPOSITIVA_PORTUGAL) == 0) {
        return precio_inicial + precio_inicial * IVA_PT;
    }

    if (strcmp(region, ZONA_IMPOSITIVA_CANARIAS) == 0) {
        return precio_inicial + precio_inicial * IGIC_IC;       
    }
}
```

