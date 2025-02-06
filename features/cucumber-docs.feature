Feature: Buscar en un sitio web

  @example1 @chrome
  Scenario: Buscar en la pagina de Cucumber 1
    Given ingreso a la url "https://cucumber.io"
    When valido que estoy en la página principal
    And busco "Docs"
    Then valido que estoy en Docs
    And busco seccion "Reports SmartBear"
    And valido que estoy en "https://cucumber.io/docs/guides/api-automation/?query=Reports%20SmartBear"

  @example2 @chrome
  Scenario: Buscar en la pagina de Cucumber 2
    Given ingreso a la url "https://www.whatismybrowser.com/"
    When valido que estoy en la página principal
    And busco "Docs"
    Then valido que estoy en Docs
    And busco seccion "Reports SmartBear"
    And valido que estoy en "https://cucumber.io/docs/guides/api-automation/?query=Reports%20SmartBear"

  @example3 @firefox
  Scenario: Buscar en la pagina de Cucumber 3
    Given ingreso a la url "https://www.whatismybrowser.com/"
    When valido que estoy en la página principal
    And busco "Docs"
    Then valido que estoy en Docs
    And busco seccion "Reports SmartBear"
    And valido que estoy en "https://cucumber.io/docs/guides/api-automation/?query=Reports%20SmartBear"

  @example4 @firefox
  Scenario: Buscar en la pagina de Cucumber 4
    Given ingreso a la url "https://www.whatismybrowser.com/"
    When valido que estoy en la página principal
    And busco "Docs"
    Then valido que estoy en Docs
    And busco seccion "Reports SmartBear"
    And valido que estoy en "https://cucumber.io/docs/guides/api-automation/?query=Reports%20SmartBear"

  @outlineExample
  Scenario Outline: Valido cada lenguaje
    Given ingreso a la url "https://cucumber.io/"
    When valido que estoy en la página principal
    And busco "Docs"
    Then valido que estoy en Docs
    When selecciono icono "<lenguaje>"
    Then valido que estoy en la seccion "<url>"

    Examples:
      | lenguaje   | url                                                             |
      | java       | https://cucumber.io/docs/guides/api-automation/?lang=java       |
      | javascript | https://cucumber.io/docs/guides/api-automation/?lang=javascript |
     # | ruby       |                                                                 |
     # | kotlin     |                                                                 |
