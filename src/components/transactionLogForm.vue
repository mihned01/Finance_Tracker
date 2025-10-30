<template>
    <Teleport to="body">
        <div v-if="isOpen" class="modal-overlay" @click="closeModal">
            <div class="modal-container" ref="modalContainer" @click.stop>
                <div class="modal-header">
                    <h3>{{ isEditing ? 'Edit Transaction' : 'Transaction Details' }}</h3>
                    <button @click="closeModal" class="close-btn">
                        <img src="@/assets/icons/xmark-solid-full.svg" alt="Close" class="close-icon">
                    </button>
                </div>

                <div class="modal-content">
                    <!-- Transaction Icon with better visual prominence -->
                    <div class="transaction-icon-wrapper">
                        <div class="transaction-icon" :class="getCategoryStyle(editableTransaction.category)">
                            <img :src="getCategoryIcon(editableTransaction.category)" :alt="editableTransaction.category"
                                class="category-svg">
                        </div>
                        <h4 class="transaction-title">{{ editableTransaction.category }}</h4>
                    </div>

                    <!-- Amount display with better prominence -->
                    <div class="amount-section">
                        <div class="form-group amount-group">
                            <label v-if="isEditing">Amount</label>
                            <input v-if="isEditing" type="number" v-model="editableTransaction.amount"
                                class="amount-input" step="0.01" min="0">
                            <div v-else class="amount-display-large" :class="editableTransaction.type + '-amount'">
                                {{ editableTransaction.type === 'income' ? '+' : '-' }}DK {{ Math.abs(editableTransaction.amount || 0).toFixed(2) }}
                            </div>
                        </div>
                    </div>

                    <!-- Form Fields with better spacing -->
                    <div class="form-section">
                        <div class="form-group">
                            <label>Description</label>
                            <input v-if="isEditing" type="text" v-model="editableTransaction.description"
                                class="description-input" placeholder="Transaction description">
                            <p v-else class="display-value">{{ editableTransaction.description || 'No description' }}
                            </p>
                        </div>

                        <div class="form-group">
                            <label>Category</label>
                            <select v-if="isEditing" v-model="editableTransaction.category" class="category-select">
                                <option v-for="category in categories" :key="category" :value="category">
                                    {{ category }}
                                </option>
                            </select>
                            <p v-else class="display-value">{{ editableTransaction.category }}</p>
                        </div>

                        <div class="form-group">
                            <label>Type</label>
                            <div v-if="isEditing" class="transaction-type">
                                <button class="type-btn expense-btn"
                                    :class="{ active: editableTransaction.type === 'expense' }"
                                    @click="editableTransaction.type = 'expense'" type="button">
                                    Expense
                                </button>
                                <button class="type-btn income-btn"
                                    :class="{ active: editableTransaction.type === 'income' }"
                                    @click="editableTransaction.type = 'income'" type="button">
                                    Income
                                </button>
                            </div>
                            <span v-else class="type-badge" :class="editableTransaction.type + '-badge'">
                                {{ editableTransaction.type === 'income' ? 'Income' : 'Expense' }}
                            </span>
                        </div>

                        <div class="form-group">
                            <label>Date & Time</label>
                            <p class="display-value date-time">{{ editableTransaction.date }} at {{ editableTransaction.time }}
                            </p>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <div class="button-group-left">
                        <button @click="confirmDelete" class="delete-btn">
                            Delete
                        </button>
                    </div>
                    <div class="button-group-right">
        <button @click="toggleEdit" class="edit-btn">
            {{ isEditing ? 'Cancel' : 'Edit' }}
        </button>
        <!-- Show Save Changes when editing, Done when not editing -->
        <button v-if="isEditing" @click="saveTransaction" class="save-btn">
            Save Changes
        </button>
        <button v-else @click="closeModal" class="done-btn">
            Done
        </button>
    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { useTransactions } from '@/modules/useTransactions.js'

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    },
    transaction: {
        type: Object,
        default: () => ({})
    }
})

const emit = defineEmits(['close', 'save', 'delete'])

const { categories, updateTransaction, deleteTransaction } = useTransactions()

const isEditing = ref(false)
const editableTransaction = ref({})

// Add a ref for the modal container
const modalContainer = ref(null)

// Watch for transaction changes and reset editable data
watch(() => props.transaction, (newTransaction) => {
    if (newTransaction && Object.keys(newTransaction).length > 0) {
        editableTransaction.value = { ...newTransaction }
        isEditing.value = false
    }
}, { immediate: true })

const closeModal = () => {
    isEditing.value = false
    emit('close')
}

const toggleEdit = async () => {
    if (isEditing.value) {
        // Cancel editing - reset to original
        editableTransaction.value = { ...props.transaction }
    }
    isEditing.value = !isEditing.value
    
    // Scroll to top of modal after the DOM has updated
    await nextTick()
    if (modalContainer.value) {
        modalContainer.value.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
}


const saveTransaction = async () => {
    try {
        await updateTransaction(editableTransaction.value)
        emit('save', editableTransaction.value)
        isEditing.value = false
        
        // Scroll to top after saving
        await nextTick()
        if (modalContainer.value) {
            modalContainer.value.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    } catch (error) {
        console.error('Error updating transaction:', error)
    }
}

const confirmDelete = async () => {
    if (confirm('Are you sure you want to delete this transaction?')) {
        try {
            await deleteTransaction(editableTransaction.value.id)
            emit('delete', editableTransaction.value.id)
            closeModal()
        } catch (error) {
            console.error('Error deleting transaction:', error)
            alert('Failed to delete transaction. Please try again.')
        }
    }
}

// Helper functions
const getCategoryIcon = (category) => {
    const icons = {
        'Rent & Bills': '/src/assets/icons/bolt-solid-full.svg',
        'Transport': '/src/assets/icons/car-solid-full.svg',
        'Healthcare': '/src/assets/icons/heart-pulse-solid-full.svg',
        'Education': '/src/assets/icons/book-open-solid-full.svg',
        'Salary': '/src/assets/icons/dollar-sign-solid-full.svg',
        'Food & Drinks': '/src/assets/icons/utensils-solid-full.svg',
        'Shopping': '/src/assets/icons/bag-shopping-solid-full.svg',
        'Travel': '/src/assets/icons/plane-solid-full.svg',
        'Other': '/src/assets/icons/category.svg'
    }
    return icons[category] || '/src/assets/icons/category.svg'
}

const getCategoryStyle = (category) => {
    const styles = {
        'Rent & Bills': 'housing-icon',
        'Transport': 'transport-icon',
        'Healthcare': 'healthcare-icon',
        'Education': 'education-icon',
        'Salary': 'salary-icon',
        'Food & Drinks': 'food-icon',
        'Shopping': 'shopping-icon',
        'Travel': 'travel-icon',
        'Other': 'other-icon'
    }
    return styles[category] || 'other-icon'
}
</script>




<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(2px);
}

.modal-container {
    background: var(--color-background);
    border-radius: 20px;
    width: 100%;
    max-width: 720px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 25px 80px rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 30px 20px 30px;
    text-align: center;
    border-bottom: 1px solid rgba(224, 224, 224, 0.3);
}

.modal-header h3 {
    font-size: 22px;
    font-weight: 600;
    color: var(--color-text);
    font-family: 'Poppins', sans-serif;
    margin: 0;
}

.modal-content {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
}

.close-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px 5px 2px 5px;
    border-radius: 8px;
    transition: background-color 0.3s ease;
}

.close-btn:hover {
    background-color: #f5f5f5;
}

.close-icon {
    width: 22px;
    height: 22px;
}


/* Enhanced transaction icon section */
.transaction-icon-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
}

.transaction-icon {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.category-svg {
    width: 40px;
    height: 40px;
}

.transaction-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--color-text);
    font-family: 'Poppins', sans-serif;
    margin: 0;
    text-align: center;
}

/* Enhanced amount section */
.amount-section {
    width: 100%;
    text-align: center;
    padding: 20px 0;
    border-radius: 12px;
    background: rgba(248, 250, 252, 0.8);
}

.amount-group {
    margin-bottom: 0 !important;
}

.amount-display-large {
    font-size: 24px;
    font-weight: 700;
    font-family: 'Poppins', sans-serif;
    margin: 0;
    text-align: center;
}

.form-section {
    width: 100%;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    color: var(--color-text);
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
    font-family: 'Poppins', sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-size: 12px;
    opacity: 0.7;
}

.amount-input,
.description-input,
.category-select {
    width: 100%;
    padding: 14px 18px;
    border: 2px solid #e0e0e0;
    border-radius: 12px;
    background: var(--color-background);
    color: var(--color-text);
    font-size: 14px;
    font-family: 'Poppins', sans-serif;
    transition: all 0.3s ease;
}

.amount-input:focus,
.description-input:focus,
.category-select:focus {
    outline: none;
    border-color: var(--color-charts-secondary);
}

.display-value {
    font-size: 18px;
    color: var(--color-text);
    margin: 0;
    padding: 14px 0;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
}

.date-time {
    color: #666;
    font-size: 14px;
}

.income-amount {
    color: #22c55e;
}

.expense-amount {
    color: #f44336;
}

/* Enhanced type badges */
.type-badge {
    display: inline-block;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.income-badge {
    background: rgba(34, 197, 94, 0.15); /* Changed to proper green */
    color: #22c55e;
}

.expense-badge {
    background: rgba(244, 67, 54, 0.15);
    color: #f44336;
}

.transaction-type {
    display: flex;
    gap: 12px;
    border-radius: 12px;
    padding: 4px;
    background: #f5f5f5;
}

.type-btn {
    flex: 1;
    padding: 12px;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: var(--color-text);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Poppins', sans-serif;
}

.type-btn.active {
    background: var(--color-charts-secondary);
    color: white;
}

/* Enhanced footer */
.modal-footer {
    padding: 25px 30px 30px 30px;
    border-top: 1px solid rgba(224, 224, 224, 0.3);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button-group-left,
.button-group-right {
    display: flex;
    gap: 12px;
}

.edit-btn,
.save-btn,
.delete-btn,
.done-btn {
    padding: 12px 24px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
    font-family: 'Poppins', sans-serif;
    min-width: 80px;
}

.edit-btn {
    background: #f8f9fa;
    color: var(--color-text);
    border: 2px solid #e9ecef;
}

.edit-btn:hover {
    background: #e9ecef;
    transform: scale(1.02);
}

.save-btn {
    background: var(--color-charts-secondary);
    color: white;
}

.save-btn:hover {
    background: var(--color-charts-three);
    transform: scale(1.02);
}

.delete-btn {
    background: #f44336;
    color: white;
    box-shadow: 0 4px 12px rgba(244, 67, 54, 0.3);
}

.delete-btn:hover {
    background: #d32f2f;
    transform: scale(1.02);
    box-shadow: 0 6px 20px rgba(244, 67, 54, 0.4);
}

.done-btn {
    background: var(--color-charts-secondary);
    color: white;
}

.done-btn:hover {
    background: var(--color-charts-three);
    transform: scale(1.02);
}

/* Enhanced category icons - same as before */
.housing-icon {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.transport-icon {
    background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
}

.healthcare-icon {
    background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
}

.education-icon {
    background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.salary-icon {
    background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.food-icon {
    background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
}

.shopping-icon {
    background: linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%);
}

.travel-icon {
    background: linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%);
}

.other-icon {
    background: linear-gradient(135deg, #9890e3 0%, #b1f4cf 100%);
}

/* Icon contrast adjustments */
.housing-icon .category-svg,
.salary-icon .category-svg,
.healthcare-icon .category-svg,
.education-icon .category-svg,
.shopping-icon .category-svg {
    filter: brightness(0) invert(1);
}

.transport-icon .category-svg,
.food-icon .category-svg,
.travel-icon .category-svg,
.other-icon .category-svg {
    filter: brightness(0);
}

@media (max-width: 768px) {
    .modal-container {
        width: 95%;
        margin: 20px;
        border-radius: 16px;
    }

    .modal-header,
    .modal-content {
        padding: 25px 20px;
    }

    .modal-footer {
        padding: 20px;
        flex-direction: column;
        gap: 15px;
    }

    .button-group-left,
    .button-group-right {
        width: 100%;
        justify-content: center;
    }

    .amount-display-large {
        font-size: 28px;
    }

    .transaction-icon {
        width: 70px;
        height: 70px;
    }

    .category-svg {
        width: 35px;
        height: 35px;
    }
}
</style>