Feature: Buscar en un sitio web

  @example
  Scenario: Buscar en la pagina de Cucumber
    Given ingreso a la url "https://cucumber.io/"
    When valido que estoy en la página principal
    And busco "Docs"
    Then valido que estoy en Docs
    And busco seccion "Reports SmartBear"
    And valido que estoy en "https://cucumber.io/docs/guides/api-automation/?query=Reports%20SmartBear"

  @example2
  Scenario: Buscar en la pagina de Cucumber
    Given ingreso a la url "https://cucumber.io/"
    When valido que estoy en la página principal
    And busco "Home"
    Then valido que estoy en Docs
    And busco seccion "Reports SmartBear"
    And valido que estoy en "https://cucumber.io/docs/guides/api-automation/?query=Reports%20SmartBear"

  @example3
  Scenario: Buscar en la pagina de Cucumber
    Given ingreso a la url "https://cucumber.io/"
    When valido que estoy en la página principal
    And busco "Docs"
    Then valido que estoy en Docs
    And busco seccion "Reporte excel"
    And valido que estoy en "https://cucumber.io/docs/guides/api-automation/?query=Reporte%20excel"
