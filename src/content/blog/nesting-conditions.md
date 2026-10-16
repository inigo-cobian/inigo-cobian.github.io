---
title: "Code Smell - Anidamientos de condiciones en anidamientos de condiciones"
description: "O por qué Inception no es parte del temario de la asignatura de programación."
pubDate: 2026-10-16
---

El anidamiento nace de una necesidad lógica: si voy a utilizar una estrucura de control, es porque el código que está dentro necesitará hacerlo bajo ciertas condiciones. Imaginemos, para este ejemplo, una cafetera que recibe una orden y, si tiene los ingredientes para hacer el café, nos prepara un riquísimo arábica.

```java
public class CoffeeMachine {
    public static void makeCoffe(CoffeeOrder order) {
        if (order != null) {
            if (order.isValid()) {
                if (this.hasWater()) {
                    if (this.hasCoffeeBeans()) {
                        this.grindBeans();
                        this.heatWater();
                        this.brewCoffee();
                        if (order.requiresMilk()) {
                            if (this.hasMilk()) {
                                this.heatMilk();
                            } else {
                                System.out.println("There is no milk left!");
                                return;
                            }
                        }
                        if (order.requiresSugar()) {
                            if (this.hasSugar()) {
                                this.putSugar();
                            } else {
                                System.out.println("There is no sugar left!");
                                return;
                            }
                        }
                        this.serveOrder();
                        System.out.println("Enjoy your coffee!");
                    } else {
                        System.out.println("The machine has no coffee beans!");
                    }
                } else {
                    System.out.println("The machine has no water!");
                }
            } else {
                System.out.println("Invalid order!");
            }
        } else {
            System.out.println("Please, select a coffee");
        }
    }
}
```


## Solución
Hay distintas estrategias para eliminar nesteos excesivos. En el caso de las validaciones, la recomendación más habitual es que sean lo primero que se ejecuta. En el caso de abajo, hemos invertido la condición de tal modo que se compruebe si hay algún fallo que impida continuar y, en ese caso, mostramos un mensaje y terminamos la ejecución. Gracias a ello, aislamos la comprobación, salimos rápido en caso de fallo, y evitamos indentar el código.

```java
public class CoffeeMachine {
    public static void makeCoffe(CoffeeOrder order) {
        if (order == null) {
            System.out.println("Please, select a coffee");
            return;
        }
        if (!order.isValid()) {
            System.out.println("Invalid order!");
            return;
        }
        if (!this.hasWater()) {
            System.out.println("The machine has no water!");
            return;
        }
        if (!this.hasCoffeeBeans()) {
            System.out.println("The machine has no coddee beans!");
            return;
        }

        if (order.requiresMilk() && this.hasMilk()) {
            this.heatMilk();
        } else {
            System.out.println("There is no milk left!");
            return;
        }
        if (order.requiresSugar() && this.hasSugar()) {
            this.putSugar();
        } else {
            System.out.println("There is no sugar left!")
            return;
        }
        this.grindBeans();
        this.heatWater();
        this.brewCoffee();
        
        this.serveOrder();
        System.out.println("Enjoy your coffee!");
    }

}
```
