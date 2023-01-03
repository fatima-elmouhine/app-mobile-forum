CREATE SCHEMA IF NOT EXISTS `Medenpharmakine` DEFAULT CHARACTER SET utf8mb4 ;

USE `Medenpharmakine` ;

-- ------------------------------------
--          table Rights             --
-- ------------------------------------

CREATE TABLE IF NOT EXISTS users (
    id_user INT AUTO_INCREMENT NOT NULL, 
    email_user VARCHAR(255),
    firstname_user VARCHAR(255), 
    lastname_user VARCHAR(255), 
    password_user VARCHAR(255), 
    PRIMARY KEY (id_user)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ------------------------------------
--        table topics         --
-- ------------------------------------

CREATE TABLE IF NOT EXISTS topics (
    id_topic INT AUTO_INCREMENT NOT NULL,
    title_topic VARCHAR(255) NOT NULL,
    id_user INT NOT NULL,
    CONSTRAINT FK_topics_id_user_users 
    FOREIGN KEY (id_user) REFERENCES users (id_user),
    PRIMARY KEY (id_topic)) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ------------------------------------
--          table messages             --
-- ------------------------------------

CREATE TABLE IF NOT EXISTS messages (
    id_message INT AUTO_INCREMENT NOT NULL,
    text_message TEXT,
    id_topic INT NOT NULL,
    id_user INT NOT NULL,
    CONSTRAINT FK_messages_id_user_users
    FOREIGN KEY (id_user) REFERENCES users (id_user),
    CONSTRAINT FK_messages_id_topic_topics
    FOREIGN KEY (id_topic) REFERENCES topics (id_topic),
    PRIMARY KEY (id_message)) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ------------------------------------
--           table themes        --
-- ------------------------------------ 

CREATE TABLE IF NOT EXISTS themes (
    id_theme INT AUTO_INCREMENT NOT NULL, 
    title_theme VARCHAR(255),
    description_theme VARCHAR(255),
    PRIMARY KEY (id_theme)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ------------------------------------
--           table courses        --
-- ------------------------------------ 

CREATE TABLE IF NOT EXISTS courses (
    id_course INT AUTO_INCREMENT NOT NULL, 
    link_course VARCHAR(255),
    id_theme INT NOT NULL,
    CONSTRAINT FK_courses_id_theme_themes
    FOREIGN KEY (id_theme) REFERENCES themes (id_theme),
    PRIMARY KEY (id_course)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ------------------------------------
--           table questions        --
-- ------------------------------------ 

CREATE TABLE IF NOT EXISTS questions (
    id_question INT AUTO_INCREMENT NOT NULL, 
    text_question TEXT,
    id_theme INT NOT NULL,
    CONSTRAINT FK_questions_id_theme_themes
    FOREIGN KEY (id_theme) REFERENCES themes (id_theme),
    PRIMARY KEY (id_question)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ------------------------------------
--           table answers        --
-- ------------------------------------ 

CREATE TABLE IF NOT EXISTS answers (
    id_answer INT AUTO_INCREMENT NOT NULL, 
    text_answer TEXT,
    isCorrect_answer BOOLEAN,
    PRIMARY KEY (id_answer)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ------------------------------------
--      table questions_answers      --
-- ------------------------------------ 

CREATE TABLE IF NOT EXISTS questions_answers (
    id_question_answer INT AUTO_INCREMENT NOT NULL, 
    id_question INT NOT NULL,
    id_answer INT NOT NULL,
    CONSTRAINT FK_questions_answers_id_question_questions
    FOREIGN KEY (id_question) REFERENCES questions (id_question),
    CONSTRAINT FK_questions_answers_id_answer_answers
    FOREIGN KEY (id_answer) REFERENCES answers (id_answer),
    PRIMARY KEY (id_question_answer)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ------------------------------------
--           table types        --
-- ------------------------------------ 

CREATE TABLE IF NOT EXISTS types (
    id_type INT AUTO_INCREMENT NOT NULL, 
    type_type VARCHAR(255),
    PRIMARY KEY (id_type)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ------------------------------------
--           table qcms        --
-- ------------------------------------ 

CREATE TABLE IF NOT EXISTS qcms (
    id_qcm INT AUTO_INCREMENT NOT NULL, 
    title_qcm VARCHAR(255),
    isGenerated_qcm BOOLEAN,
    id_type INT NOT NULL,
    id_user INT NOT NULL,
    CONSTRAINT FK_qcms_id_type_types
    FOREIGN KEY (id_type) REFERENCES types (id_type),
    CONSTRAINT FK_qcms_id_user_users
    FOREIGN KEY (id_user) REFERENCES users (id_user),
    PRIMARY KEY (id_qcm)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ------------------------------------
--       table qcms_questions        --
-- ------------------------------------ 

CREATE TABLE IF NOT EXISTS qcms_questions (
    id_qcm_question INT AUTO_INCREMENT NOT NULL, 
    id_question INT NOT NULL,
    id_qcm INT NOT NULL,
    CONSTRAINT FK_qcms_questions_id_question_questions
    FOREIGN KEY (id_question) REFERENCES questions (id_question),
    CONSTRAINT FK_qcms_questions_id_qcm_qcms
    FOREIGN KEY (id_qcm) REFERENCES qcms (id_qcm),
    PRIMARY KEY (id_qcm_question)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ------------------------------------
--           table users_qcms        --
-- ------------------------------------ 

CREATE TABLE IF NOT EXISTS users_qcms (
    id_user_qcm INT AUTO_INCREMENT NOT NULL,
    structure_qcm_result VARCHAR(255),
    answers_qcm_result VARCHAR(255),
    id_qcm INT NOT NULL,
    id_user INT NOT NULL,
    CONSTRAINT FK_users_qcms_id_qcm_qcms
    FOREIGN KEY (id_qcm) REFERENCES qcms (id_qcm),
    CONSTRAINT FK_users_qcms_id_user_users
    FOREIGN KEY (id_user) REFERENCES users (id_user),
    PRIMARY KEY (id_user_qcm)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;    

-- ------------------------------------
--           table results           --
-- ------------------------------------ 

CREATE TABLE IF NOT EXISTS results (
    id_result INT AUTO_INCREMENT NOT NULL,
    result_result FLOAT,
    answers_qcm_result VARCHAR(255),
    id_question INT NOT NULL,
    id_user INT NOT NULL,
    id_user_qcm INT NOT NULL,
    CONSTRAINT FK_results_id_question_questions
    FOREIGN KEY (id_question) REFERENCES questions (id_question),
    CONSTRAINT FK_results_id_user_users
    FOREIGN KEY (id_user) REFERENCES users (id_user),
    CONSTRAINT FK_results_id_user_qcm_users_qcms
    FOREIGN KEY (id_user_qcm) REFERENCES users_qcms (id_user_qcm),
    PRIMARY KEY (id_result)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

  