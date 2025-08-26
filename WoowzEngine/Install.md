# Установка WoowzEngine

Для начала работы с **WoowzEngine** версии **{WoowzEngineVersion}**, вам понадобится:

* **Базовые знания Java**  
	Я не буду объяснять как писать на Java, эта википедия не об этом

* **Java IDE**  
	Я использую: **IntelliJ IDEA 2024.2.5 Ultimate Edition**

* **Java JDK 17**  
	(обязательно версия **>= 17**, но в более новых версиях **кириллица может отображаться некорректно в консоли IDE**)  
	Я использую: [Temurin JDK 17](https://adoptium.net/)

* **Gradle**  
	Я использую: **Gradle 8.8**
  
---

## Создание проекта

Создайте новый проект с типом **Gradle (Java)** в вашей IDE

---

## Получение WoowzEngine

см. [Получение WoowzEngine](Get.md)

---

## Подключение WoowzEngine

Создайте папку (Package) внутри проекта (`src/main/java`), и назовите её допустим `libs`

Поместите полученные файлы WoowzEngine: `WoowzEngine.jar`, `WoowzEngine-sources.jar`, `WoowzEngine-javadoc.jar` в папку которую вы создали

В файл ```build.gradle``` добавьте следующий код для подключения **JAR-библиотеки WoowzEngine**:

### ```build.gradle```

```gradle
repositories {
	...
	flatDir {
		dirs 'libs' // Укажите название папки которую вы создали
	}
	...
}

dependencies {
	...
	implementation name: 'WoowzEngine-{WoowzEngineVersion}'
	implementation name: 'WoowzEngine-{WoowzEngineVersion}-sources' // Опционально, нужно для подсветки
	implementation name: 'WoowzEngine-{WoowzEngineVersion}-javadoc' // Опционально, нужно для JavaDoc
	...
}
```

---

## Создание стартового скрипта

Создайте папку внутри папки `java` (С названием вашего проекта например), или используйте готовую

Создайте в созданной папке стартовый скрипт `Run.java`

### Пример содержимого `Run.java`:

```java
/* Выше должны быть package, import's */

/* Запускающий скрипт для WoowzEngine v.{WoowzEngineVersion} */
public class Run { // Укажите своё название скрипта
	public static void main(String[] Args){
		try {
			WE.Install.Awake(Config.Awake()
					.Name  ("") // Укажите название вашего проекта (Допустим "The Game")
					.ID	("") // Укажите ID вашего проекта (Допустим "the_game" или "TheGame")
					.Author("") // Укажите себя
			);
			
			/* Тут какие-то действия до запуска движка */
		
			/* Запуск движка */
			WE.Install.Start(Config.Start());

			/* Создание окна */
			WE.Install.CreateWindow(Config.Window());

			/* Тут желательно устанавливать сцену */

			/* Цикл */
			while (WE.Install.DoCycle()){
				/* Начало цикла (обязательно в начале!) */
				WE.Install.StartCycle();

				/* Тут можете сделать собственную обработку цикла */

				/* Конец цикла (обязательно в конце!) */
				WE.Install.EndCycle();
			}

			/* конец движка */
			WE.Install.End(true);
		} catch (Exception e) {
			/* произошла ошибка */
			WE.Install.Crashed(e);
		}
	}
}
``` 

---

## Финальная проверка

Убедитесь, что:
* Проект успешно компилируется (`./gradlew build` или через IDE)
* Окно создаётся и отображается
* Цикл игры выполняется без ошибок
* Подсветка кода и JavaDoc работают в IDE (если подключали)