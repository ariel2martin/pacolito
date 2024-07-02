int main()
{
    int mozos, menu;
    int contador = 0;
    int Vm[50] = {0};
    float importe;
    int mat[10][50] = {{0}};
    printf("Ingrese codigo del menu: ");
    menu = INGRESO(101, 150, 0);

    while (menu != 0)
    {
        printf("\nIngrese codigo del mozo: ");
        mozos = INGRESO(1, 10, 1);
        do
        {
            printf("\ningrese importe:\n");
            scanf("%f", &importe);
        } while (importe < 0);
        menu -= 101;
        mozos -= 1;
        mat[mozos][menu] += importe;
        contador = VENTAS(Vm, importe, menu, contador);

        printf("Ingrese codigo del menu: ");
        menu = INGRESO(101, 150, 0);
    }

    MOSTRAR(mat, 10, 50);
    MOSTRAR_FACTURACION(Vm, importe);
    VentasTotales(contador);
    NoMozos(mat, 10, 50);
}
void NoMozos(int mat[][50], int f, int c)
{
    int i, j;
    int ok = 0;
    for (i = 0; i < f - 1; i++)
    {
        for (j = 0; j < c - 1; j++)
        {
            if (mat[i][j] == 0)
            {
                ok = 1;
            }
        }
        if (ok == 0)
        {
            printf("\nEl mozo numero %d, no registro ventas", i + 1);
        }
        ok = 0;
    }
}
void MOSTRAR(int mat[][50], int f, int c)
{
    int i, j;
    printf("Los importes son:");

    for (i = 0; i < f - 1; i++)
    {
        printf("\n[%d]", i + 1);
        for (j = 0; j < c - 1; j++)
        {
            printf("%d", mat[i][j]);
        }
    }
}