Написано для версии: **51** (более новые могут отличаться)
# Установка WoowzEngine

Для начала работы с **WoowzEngine** версии **{WoowzEngineVersion}**, вам понадобится:

* **Базово знать Java**  
	Я не буду расжёвывать как писать на Java, эта википедия не об этом

* **Java IDE**  
	Я использую: **IntelliJ IDEA 2024.2.5 Ultimate Edition**

* **Java JDK 17**  
	(обязательно версия **>= 17**, но в более новых версиях **кириллица может отображаться некорректно в консоли**)  
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

Создайте папку внутри проекта, назовите её допустим `libs`

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
	implementation name: 'WoowzEngine' // Укажите название файлов, как вам удобнее, очищай версию из названия, или вписывай сюда с версией, типа 'WoowzEngine-{WoowzEngineVersion}'
	implementation name: 'WoowzEngine-javadoc'
	implementation name: 'WoowzEngine-sources'	 ??? скажите вувзу что-бы проверил это, а то не дело))))
	...
}
```

---

## Создание стартового скрипта

Создайте папку внутри папки `java` (С названием вашего проекта например), или используйте готовую

Создайте в созданной папке стартовый скрипт `Run.java`

### Пример содержимого:

```java
/* Выше должны быть package, import's */
/* Запускающий скрипт для WoowzEngine v.{WoowzEngineVersion} */
public class Run { // Укажите своё название скрипта (если хотите)
	public static void main(String[] Args){
		try {
			WE.Install.Awake(Config.Awake()
					.SetName  ("") // Укажите название вашего проекта (Допустим "The Game")
					.SetID	("") // Укажите ID вашего проекта (Допустим "the_game" или "TheGame")
					.SetAuthor("") // Укажите себя
			);
		
			/* Запуск движка */
			WE.Install.Start(Config.Start());

			/* Создание окна */
			WE.Install.CreateWindow(Config.Window());

			/* Цикл */
			while (WE.Install.DoCycle()){
				/* Начало цикла (обязательно в начале!) */
				WE.Install.StartCycle();

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
* проект успешно компилируется (`./gradlew build` или через IDE)
* JavaDoc и исходники работают (Есть подсветка и говорит что код найденный)
* библиотека подключена