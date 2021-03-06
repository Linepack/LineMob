/* global Mustache, logUtil, mainController, alertUtil, daoUtil, Controller, iconUtil, i18next */

var pessoaController = {
    TEMPLATE_CADASTRO: "",
    TEMPLATE_LISTA: "",
    TEMPLATE_EDICAO: "",
    loadList: function (cb) {

        Controller.loadList({
            controllerOrigin: this,
            entity: new Pessoa(),
            orderBy: "nome",
            template: pessoaController.TEMPLATE_LISTA,
            navLeft: {
                icon: iconUtil.back,
                callbackClick: function () {
                    mainController.render();
                }
            },
            navCenter: {
                title: i18next.t("pessoa-controller.plural"),
                icon: ""
            },
            floatButton: {
                display: "block",
                callbackAdd: function () {
                    pessoaController.loadNewOrSingleEdit();
                }
            }
        }, function () {
            if (cb) {
                cb();
            }
        });
    },
    loadNewOrSingleEdit: function (data, cb) {
        Controller.loadNewOrSingleEdit({
            controllerOrigin: pessoaController,
            entity: new Pessoa(),
            template: pessoaController.TEMPLATE_CADASTRO,
            navLeft: {
                icon: iconUtil.back,
                callbackClick: function () {
                    pessoaController.loadList();
                }
            },
            navCenter: {
                title: i18next.t("pessoa-controller.singular"),
                icon: (data) ? iconUtil.edit : iconUtil.add
            },
            inputToFocus: "#nome"
        }, data, function () {
            if (cb) {
                cb();
            }
        });
    },
    loadMultipleEdit: function (data, cb) {
        Controller.loadMultipleEdit({
            controllerOrigin: pessoaController,
            entity: new Pessoa(),
            template: pessoaController.TEMPLATE_EDICAO,
            navLeft: {
                icon: iconUtil.back,
                callbackClick: function () {
                    pessoaController.loadList();
                }
            },
            navCenter: {
                title: i18next.t("pessoa-controller.plural"),
                icon: iconUtil.edit
            }
        }, data, function () {
            if (cb) {
                cb();
            }
        });
    },
    selecionaCampoEdicaoMultipla: function () {
        var campo = $("#select-campo").val();

        if (campo === "nome") {
            $("#prompt-campo").html(i18next.t("pessoa-controller.field-nome"));
            $("#valor-campo").prop("name", "nome");
            $("#valor-campo").prop("type", "text");
        } else if (campo === "apelido") {
            $("#prompt-campo").html(i18next.t("pessoa-controller.field-apelido"));
            $("#valor-campo").prop("name", "apelido");
            $("#valor-campo").prop("type", "text");
        }
    },
    validaFormulario: function (pessoa, cb, field) {
        if (!field) {
            if (!pessoa.nome) {
                alertUtil.confirm(i18next.t("pessoa-controller.alert-nome-req"));
            } else if (!pessoa.apelido) {
                alertUtil.confirm(i18next.t("pessoa-controller.alert-apelido-req"));
            } else {
                if (cb) {
                    cb();
                }
            }
        } else {
            if (cb) {
                cb();
            }
        }
    },
    loadNewModal: function (element, callbackAction) {
        Controller.loadNewModal({
            controllerModal: pessoaController,
            entity: new Pessoa(),
            element: element,
            templateCadastro: pessoaController.TEMPLATE_CADASTRO,
            tituloNavCenter: i18next.t("pessoa-controller.singular"),
            columnToReRender: "apelido",
            orderByReRender: "apelido",
            callbackAction: function () {
                if (callbackAction) {
                    callbackAction();
                }
            },
            labelSelect: i18next.t("pessoa-controller.field-select-pessoa")
        });
    }
}; 