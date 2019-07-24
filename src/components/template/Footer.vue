<template>
    <footer class="footer">
        <span class="footer__span">Desenvolvido pelo Departamento de Informática do CEB</span>
        <div class="footer__icon">
            <a href="mailto:redes@ceb.unicamp.br">
                <i class="fa fa-envelope-o" />
            </a>
        </div>
    </footer>    
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style>
    .footer {
        grid-area: footer;
        display: flex;
        align-items: center;
        justify-content: flex-end;
                
        background: #2c3e50;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #3498db, #2c3e50);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #3498db, #2c3e50); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */        
    }

    .footer__span {
        color: #fff;
        font-weight: bold;
    }

    .footer__icon a,
    .footer__icon a:hover {
        margin-left: 20px;
        margin-right: 40px;
                
        color: #fff;
        font-size: 2.5rem;
        text-decoration: none;
    }
</style>
